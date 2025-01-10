interface ILoadingProps {
  show: boolean
}

function Loading(props: ILoadingProps) {
  if (!props.show) {
    return null
  }

  return (
    <div className="absolute top-0 left-0 bg-black/60 flex items-center justify-center w-full h-full">
      <div className="border border-white w-10 h-10 rounded-full border-b-transparent animate-spin"/>
    </div>
  )
}

export default Loading
