"use client";

import { useEffect, useRef } from "react";

interface ModelViewerProps {
  src: string;
  name: string;
  cameraOrbit?: string;
}

export default function ModelViewer({
  src,
  name,
  cameraOrbit = "0deg 90deg 105%",
}: ModelViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<any>(null);
  const originalOrbitRef = useRef<string>(cameraOrbit);

  useEffect(() => {
    if (!containerRef.current) return;

    // Import model-viewer dynamically
    import("@google/model-viewer").catch(console.error);

    // Create model-viewer element
    const viewer = document.createElement("model-viewer");
    viewer.src = src;
    viewer.alt = name;
    viewer.setAttribute("camera-target", "0m 0m 0m");
    viewer.setAttribute("camera-orbit", cameraOrbit);
    viewer.setAttribute("exposure", "1");
    viewer.removeAttribute("auto-rotate");
    viewer.removeAttribute("auto-rotate-delay");
    viewer.setAttribute("ar", "false");
    viewer.setAttribute("ar-modes", "");
    viewer.style.width = "100%";
    viewer.style.height = "100%";
    viewer.style.transition = "none";
    viewer.style.animation = "none";

    viewer.setAttribute("camera-controls", "");
    viewer.setAttribute("touch-action", "pan-y");

    viewerRef.current = viewer;

    viewer.addEventListener("error", (event: any) => {
      console.error("[v0] model-viewer error:", event.detail);
    });

    viewer.addEventListener("load", () => {
      console.log("[v0] Model loaded successfully:", name);
      viewer.removeAttribute("auto-rotate");
      viewer.setAttribute("camera-orbit", cameraOrbit);
    });

    let isUserInteracting = false;
    let snapBackTimeout: NodeJS.Timeout;

    viewer.addEventListener("mousedown", () => {
      isUserInteracting = true;
      if (snapBackTimeout) clearTimeout(snapBackTimeout);
    });

    viewer.addEventListener("touchstart", () => {
      isUserInteracting = true;
      if (snapBackTimeout) clearTimeout(snapBackTimeout);
    });

    const handleInteractionEnd = () => {
      isUserInteracting = false;
      snapBackTimeout = setTimeout(() => {
        const newOrbit = viewer.getAttribute("camera-orbit");
        // Extract zoom percentage while resetting rotation to original
        const zoomMatch = newOrbit?.match(/(\d+%)$/);
        const zoom = zoomMatch ? zoomMatch[1] : originalOrbitRef.current.split(" ")[2];
        
        // Build the target orbit: keep original angles, use current zoom
        const originalParts = originalOrbitRef.current.split(" ");
        const targetOrbit = `${originalParts[0]} ${originalParts[1]} ${zoom}`;
        
        // Smoothly animate back to original position
        viewer.style.transition = "all 600ms ease-out";
        viewer.setAttribute("camera-orbit", targetOrbit);
        setTimeout(() => {
          viewer.style.transition = "none";
        }, 600);
      }, 100);
    };

    viewer.addEventListener("mouseup", handleInteractionEnd);
    viewer.addEventListener("touchend", handleInteractionEnd);
    viewer.addEventListener("pointerup", handleInteractionEnd);

    containerRef.current.appendChild(viewer);

    return () => {
      if (snapBackTimeout) {
        clearTimeout(snapBackTimeout);
      }
      if (containerRef.current?.firstChild) {
        containerRef.current.removeChild(containerRef.current.firstChild);
      }
    };
  }, [src, name, cameraOrbit]);

  return (
    <div className="w-full h-full">
      <div ref={containerRef} className="w-full h-full" style={{ transition: "none" }} />
      <script
        type="importmap"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            imports: {
              "@google/model-viewer":
                "https://cdn.jsdelivr.net/npm/@google/model-viewer@4.0.0/dist/model-viewer.min.js",
            },
          }),
        }}
      />
    </div>
  );
}
