export function LoadingSpinner() {
  return (
    <div className="flex items-center space-x-2">
      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
      <span>Processing...</span>
    </div>
  )
}
