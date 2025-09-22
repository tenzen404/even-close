import { useToasts } from './useToasts'
import { ToastComponent } from './ToastComponent'

export function Toasts() {
  const { toasts } = useToasts()

  return (
    <div className="fixed w-full bottom-8 z-20">
      <div className="flex flex-col gap-2 items-center">
        {toasts.map((toast) => (
          <ToastComponent key={toast.id} toast={toast} />
        ))}
      </div>
    </div>
  )
}
