function greeter(person: string) {
  return "Hello, " + person;
}

document.getElementById('app')!.innerHTML = greeter('World');