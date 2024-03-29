import { NoopStorage } from "./noopStorage"
import { storageFactory } from "./storageFactory"
import { Storage } from "./types"

const errorMessage =
  "[WARNING]: Session-storage is not available. Nothing is stored."

function getSessionStorage(): Storage {
  const storage = window?.sessionStorage || global?.sessionStorage
  if (!storage) {
    console.warn(errorMessage)

    return NoopStorage
  }

  return storage
}

export const SessionStorage = storageFactory(getSessionStorage)
