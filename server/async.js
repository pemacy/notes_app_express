async function greet(name) {
  console.log("hello", name);
  await console.log("can you hear me?");
  console.log("goodbye", name);
}

greet("Tom");
greet("Brad");
