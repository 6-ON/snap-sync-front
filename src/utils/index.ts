export const toBase64 = (file: File | undefined) => {
    return new Promise<string>((resolve, reject) => {
        if (!file) return resolve('')
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = (error) => reject(error)
    })
}