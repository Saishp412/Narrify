export async function login(email: string, password: string) {
  // Replace with real API call
  console.log("API login", { email, password });
}

export async function register(email: string, password: string) {
  console.log("API register", { email, password });
}

export async function uploadDocument(file: File) {
  console.log("Upload document", file.name);
}
