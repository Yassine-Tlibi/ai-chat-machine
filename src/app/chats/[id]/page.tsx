export default function ChatPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Past Chat: {params.id}</h1>
      <p className="text-gray-500">This is a placeholder for your previous conversation.</p>
    </div>
  )
}
