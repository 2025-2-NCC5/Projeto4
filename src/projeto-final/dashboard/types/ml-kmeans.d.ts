declare module 'ml-kmeans' {
  export interface KMeansResult {
    clusters: number[];           // índice do cluster para cada ponto
    centroids: Array<{ centroid: number[] } | number[]>; // depende da versão
  }

  export default function kmeans(
    data: number[][],
    k: number,
    options?: Record<string, unknown>
  ): KMeansResult;
}
