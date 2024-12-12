import {
  BlockScrollStrategy,
  CloseScrollStrategy,
  NoopScrollStrategy,
  Overlay,
  RepositionScrollStrategy,
} from '@angular/cdk/overlay';

export function scrollStrategyFactory(
  overlay: Overlay
): () => NoopScrollStrategy {
  return () => overlay.scrollStrategies.noop();
}
