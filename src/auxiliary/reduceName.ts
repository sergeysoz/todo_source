export default function reduceName(name: string, len: number): string {
  return name.length > len ? name.slice(0, len) + "..." : name;
}
