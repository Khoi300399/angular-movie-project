import { Observable, combineLatest, map } from 'rxjs';

type ObservableMap<T> = {
  [K in keyof T]: Observable<T[K]>;
};

export function vmFromLatest<
  TVm extends ObservableMap<any>,
  TComputedVm extends {} = any
>(
  vmBase: TVm,
  manipulateFunction?: (vmBaseReturn: TVm) => TComputedVm
): Observable<TVm & TComputedVm> {
  return combineLatest(Object.values(vmBase)).pipe(
    map((responses) => {
      const returnVm: TVm = Object.keys(vmBase).reduce((vm, key, index) => {
        vm[key as keyof TVm] = responses[index];
        return vm;
      }, {} as TVm);

      if (manipulateFunction) {
        const manipulatedVm = manipulateFunction(returnVm);
        return { ...returnVm, ...manipulatedVm } as TVm & TComputedVm;
      }

      return returnVm as TVm & TComputedVm;
    })
  );
}
