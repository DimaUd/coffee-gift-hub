import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import React from "react";
import { useIsMobile } from "../use-mobile";
import "@testing-library/jest-dom";

const TestComponent = () => {
  const isMobile = useIsMobile();
  return <span>{isMobile ? "mobile" : "desktop"}</span>;
};

describe("useIsMobile", () => {
  let listeners: Array<(e: MediaQueryListEvent) => void> = [];

  function triggerChange() {
    listeners.forEach((cb) => cb({ matches: window.innerWidth < 768 } as MediaQueryListEvent));
  }

  beforeEach(() => {
    listeners = [];
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: window.innerWidth < 768,
        media: query,
        addEventListener: (_: string, cb: (e: MediaQueryListEvent) => void) => {
          listeners.push(cb);
        },
        removeEventListener: (_: string, cb: (e: MediaQueryListEvent) => void) => {
          listeners = listeners.filter((l) => l !== cb);
        },
      })),
    });
  });

  it("responds to window width changes", async () => {
    window.innerWidth = 1024;
    render(<TestComponent />);
    await screen.findByText("desktop");

    window.innerWidth = 500;
    triggerChange();
    await screen.findByText("mobile");
  });
});
