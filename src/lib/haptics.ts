"use client";

export const triggerHapticFeedback = (
  style:
    | "light"
    | "medium"
    | "heavy"
    | "success"
    | "warning"
    | "error" = "medium",
) => {
  if (
    typeof window !== "undefined" &&
    "navigator" in window &&
    "vibrate" in window.navigator
  ) {
    try {
      switch (style) {
        case "light":
          window.navigator.vibrate(20);
          break;
        case "medium":
          window.navigator.vibrate(40);
          break;
        case "heavy":
          window.navigator.vibrate(60);
          break;
        case "success":
          window.navigator.vibrate([10, 30, 10]);
          break;
        case "warning":
          window.navigator.vibrate([10, 30, 10, 30, 10]);
          break;
        case "error":
          window.navigator.vibrate([50, 20, 50]);
          break;
        default:
          window.navigator.vibrate(40);
          break;
      }
    } catch (err) {
      console.error("Haptic feedback failed:", err);
    }
  }
};
