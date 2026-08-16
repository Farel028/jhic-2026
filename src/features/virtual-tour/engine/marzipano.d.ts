declare module "marzipano" {
  namespace Marzipano {
    type ViewParameters = { yaw: number; pitch: number; fov: number };
    type Coordinates = { yaw: number; pitch: number };
    type ScreenPoint = { x: number; y: number };

    interface RectilinearViewInstance {
      yaw(): number;
      pitch(): number;
      fov(): number;
      setParameters(parameters: ViewParameters): void;
      screenToCoordinates(point: ScreenPoint): Coordinates | null;
    }

    interface Scene {
      switchTo(options?: { transitionDuration?: number }, done?: () => void): void;
      lookTo(parameters: ViewParameters, options?: { transitionDuration?: number; controlsInterrupt?: boolean }, done?: () => void): void;
      view(): RectilinearViewInstance;
      hotspotContainer(): HotspotContainer;
    }

    interface Hotspot {
      destroy(): void;
    }

    interface HotspotContainer {
      createHotspot(element: HTMLElement, coordinates: Coordinates): Hotspot;
      hasHotspot(hotspot: Hotspot): boolean;
      destroyHotspot(hotspot: Hotspot): void;
    }

    class Viewer {
      constructor(container: HTMLElement, options?: { controls?: { mouseViewMode?: "drag" | "qtvr" } });
      createScene(options: { source: unknown; geometry: unknown; view: RectilinearViewInstance; pinFirstLevel?: boolean }): Scene;
      startMovement(movement: unknown): void;
      stopMovement(): void;
      destroy(): void;
    }

    const ImageUrlSource: {
      fromString(url: string): unknown;
    };

    class EquirectGeometry {
      constructor(levels: readonly { width: number }[]);
    }

    class RectilinearView implements RectilinearViewInstance {
      static limit: {
        traditional(resolution: number, maxFov: number): unknown;
      };
      constructor(initialView?: Partial<ViewParameters>, limiter?: unknown);
      yaw(): number;
      pitch(): number;
      fov(): number;
      setParameters(parameters: ViewParameters): void;
      screenToCoordinates(point: ScreenPoint): Coordinates | null;
    }

    function autorotate(options?: { yawSpeed?: number; targetPitch?: number; targetFov?: number }): unknown;
  }

  export = Marzipano;
}
