import { Ref, UnwrapRef } from 'vue';
interface useEnhanceRefOpt<T = unknown> {
    /**
     *
     * 准备更新之前触发
     *
     * @public
     */
    onBeforeUpdate(newValue: UnwrapRef<T>): void;
}
/**
 *
 * 增强ref返回类型
 *
 * @public
 *
 */
declare type useEnhanceRefReturnTypes<T = unknown> = [Ref<UnwrapRef<T>>, (newValue: UnwrapRef<T>) => void];
/**
 *
 * 增强ref
 *
 *
 * @param val
 */
export declare function useEnhanceRef<T = unknown>(val: T, opt?: Partial<useEnhanceRefOpt>): useEnhanceRefReturnTypes<T>;
export {};
