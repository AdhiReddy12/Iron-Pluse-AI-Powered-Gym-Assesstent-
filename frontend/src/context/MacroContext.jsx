import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { fetchUserProfile, updateUserMacros } from '../api/auth';

const MacroContext = createContext(null);

export const ACTIVITY_MULTIPLIERS = {
  sedentary: { label: 'Sedentary (desk job, little/no exercise)', value: 1.2 },
  lightly_active: { label: 'Lightly Active (exercise 1-3 days/week)', value: 1.375 },
  moderately_active: { label: 'Moderately Active (exercise 3-5 days/week)', value: 1.55 },
  very_active: { label: 'Very Active (hard exercise 6-7 days/week)', value: 1.725 },
  extra_active: { label: 'Extra Active (physical job & 2x daily workouts)', value: 1.9 },
};

export const FITNESS_GOALS = {
  fat_loss: { label: 'Fat Loss (Caloric Deficit -500 kcal)', calAdjustment: -500, proteinMultiplier: 2.2 },
  maintenance: { label: 'Maintenance (Maintain Weight)', calAdjustment: 0, proteinMultiplier: 2.0 },
  muscle_gain: { label: 'Muscle Gain (Caloric Surplus +350 kcal)', calAdjustment: 350, proteinMultiplier: 2.2 },
};

export function calculateMacroTargets(data) {
  const age = Number(data.age) || 25;
  const height = Number(data.height) || 175;
  const weight = Number(data.weight) || 70;
  const gender = data.gender || 'male';
  const activityKey = data.activity || 'moderately_active';
  const goalKey = data.goal || 'maintenance';

  // 1. BMR (Mifflin-St Jeor)
  const bmr = gender === 'male'
    ? Math.round((10 * weight) + (6.25 * height) - (5 * age) + 5)
    : Math.round((10 * weight) + (6.25 * height) - (5 * age) - 161);

  // 2. TDEE
  const actMult = ACTIVITY_MULTIPLIERS[activityKey]?.value || 1.55;
  const tdee = Math.round(bmr * actMult);

  // 3. Goal Adjustment
  const goalObj = FITNESS_GOALS[goalKey] || FITNESS_GOALS.maintenance;
  const calories = Math.max(1200, Math.round(tdee + goalObj.calAdjustment));

  // 4. Protein (g)
  const protein = Math.round(weight * goalObj.proteinMultiplier);
  const proteinCal = protein * 4;

  // 5. Fats (g) - 25% of total calories
  const fatCal = calories * 0.25;
  const fats = Math.round(fatCal / 9);

  // 6. Carbs (g) - remaining calories
  const carbCal = Math.max(0, calories - (proteinCal + fatCal));
  const carbs = Math.round(carbCal / 4);

  return {
    age, height, weight, gender, activity: activityKey, goal: goalKey,
    bmr, tdee, calories, protein, fats, carbs,
  };
}

export function getMacrosFromUser(u) {
  if (!u || !u.hasConfiguredMacros || !u.targetCalories) return null;
  return {
    age: u.age || 25,
    height: u.height || 175,
    weight: u.weight || 70,
    gender: u.gender || 'male',
    activity: u.activity || 'moderately_active',
    goal: u.goal || 'maintenance',
    calories: u.targetCalories,
    protein: u.targetProtein || 150,
    fats: u.targetFats || 70,
    fat: u.targetFats || 70,
    carbs: u.targetCarbs || 240,
  };
}

export function getMacrosFromStorage(email) {
  if (!email) return null;
  try {
    const raw = localStorage.getItem(`iron_macros_${email.toLowerCase()}`);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function MacroProvider({ children }) {
  const { user, token, setUser, loading: authLoading } = useAuth();

  const [userMacros, setUserMacros] = useState(() => {
    return getMacrosFromUser(user) || getMacrosFromStorage(user?.email);
  });
  const [modalOpen, setModalOpen] = useState(false);

  // Sync state whenever user changes
  useEffect(() => {
    if (!user) {
      setUserMacros(null);
      return;
    }

    const fromUser = getMacrosFromUser(user);
    if (fromUser) {
      setUserMacros(fromUser);
      if (user.email) {
        try {
          localStorage.setItem(`iron_macros_${user.email.toLowerCase()}`, JSON.stringify(fromUser));
        } catch {}
      }
      return;
    }

    const fromStorage = getMacrosFromStorage(user.email);
    if (fromStorage && fromStorage.calories) {
      setUserMacros(fromStorage);
      return;
    }

    if (user.hasConfiguredMacros === false) {
      setUserMacros(null);
      if (user.email) {
        try {
          localStorage.removeItem(`iron_macros_${user.email.toLowerCase()}`);
        } catch {}
      }
    }
  }, [user]);

  const saveMacros = async (formData) => {
    const calculated = calculateMacroTargets(formData);
    setUserMacros(calculated);
    if (user?.email) {
      try {
        localStorage.setItem(`iron_macros_${user.email.toLowerCase()}`, JSON.stringify(calculated));
      } catch {}
    }
    setModalOpen(false);

    if (setUser) {
      setUser((prev) => prev ? {
        ...prev,
        hasConfiguredMacros: true,
        age: calculated.age,
        height: calculated.height,
        weight: calculated.weight,
        gender: calculated.gender,
        activity: calculated.activity,
        goal: calculated.goal,
        targetCalories: calculated.calories,
        protein: calculated.protein,
        fats: calculated.fats,
        carbs: calculated.carbs,
      } : prev);
    }

    // Save to Database
    try {
      if (token) {
        await updateUserMacros(token, {
          gender: calculated.gender,
          activity: calculated.activity,
          goal: calculated.goal,
          age: calculated.age,
          height: calculated.height,
          weight: calculated.weight,
          calories: calculated.calories,
          protein: calculated.protein,
          fats: calculated.fats,
          carbs: calculated.carbs,
        });
      }
    } catch (err) {
      console.warn('Could not sync macros to DB:', err);
    }

    return calculated;
  };

  const openMacroCalculator = () => setModalOpen(true);
  const closeMacroCalculator = () => setModalOpen(false);

  // Synchronously determine if macros are set to avoid any render flash
  const effectiveMacros = userMacros || getMacrosFromUser(user) || getMacrosFromStorage(user?.email);

  const hasConfiguredMacros = Boolean(
    user && (user.hasConfiguredMacros === true || Boolean(effectiveMacros && effectiveMacros.calories))
  );

  const macrosLoading = Boolean(
    authLoading || (user && user.hasConfiguredMacros === undefined && !effectiveMacros)
  );

  const shouldShowOnboardingWizard = Boolean(
    user && !authLoading && !macrosLoading && !hasConfiguredMacros
  );

  return (
    <MacroContext.Provider
      value={{
        userMacros: effectiveMacros,
        saveMacros,
        modalOpen,
        openMacroCalculator,
        closeMacroCalculator,
        hasConfiguredMacros,
        macrosLoading,
        shouldShowOnboardingWizard,
        calculateMacroTargets,
      }}
    >
      {children}
    </MacroContext.Provider>
  );
}

export function useMacros() {
  const context = useContext(MacroContext);
  if (!context) {
    throw new Error('useMacros must be used within a MacroProvider');
  }
  return context;
}
