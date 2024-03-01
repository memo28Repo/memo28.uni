import {Ref, ref, UnwrapRef} from 'vue'

interface useEnhanceRefOpt<T = unknown> {
    /**
     *
     * 准备更新之前触发
     *
     * @public
     */
    onBeforeUpdate(newValue: UnwrapRef<T>): void
}

/**
 *
 * 增强ref返回类型
 *
 * @public
 *
 */
type useEnhanceRefReturnTypes<T = unknown> = [Ref<UnwrapRef<T>>, (newValue: UnwrapRef<T>) => void]


/**
 *
 * 增强ref
 *
 *
 * @param val
 */
export function useEnhanceRef<T = unknown>(val: T, opt?: Partial<useEnhanceRefOpt>): useEnhanceRefReturnTypes<T> {

    const value = ref<T>(val)

    function setValue(newValue: UnwrapRef<T>) {
        opt?.onBeforeUpdate?.(newValue)
        value.value = newValue
    }

    return [value, setValue]
}
