export function ImagePreview({src, onClose}:{src:string | null; onClose: ()=>void}) {

    if (!src) return

    return <div className="fixed inset-0 bg-[rgb(0,0,0,.5)] flex justify-center items-center p-3" onClick={onClose}>
        <img src={src} className="max-h-[90vh] max-w-[90vw] object-contain h-full w-full"/>
    </div>
}