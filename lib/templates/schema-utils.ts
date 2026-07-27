export function getValueByPath(data: unknown, path: string): unknown {
  const parts = path.split(".");
  let current: unknown = data;
  for (const part of parts) {
    if (current === null || current === undefined || typeof current !== "object") {
      return undefined;
    }
    current = (current as Record<string, unknown>)[part];
  }
  return current;
}

export function setValueByPath(
  data: unknown,
  path: string,
  value: unknown
): unknown {
  const parts = path.split(".");
  const clone = structuredClone(data);
  let current: Record<string, unknown> = clone as Record<string, unknown>;

  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    const next = current[part];
    if (typeof next !== "object" || next === null) {
      current[part] = {};
    }
    current = current[part] as Record<string, unknown>;
  }

  current[parts[parts.length - 1]] = value;
  return clone;
}

export function validateDataPathsAgainstSchema(
  data: Record<string, unknown>,
  schemaPaths: Set<string>,
  prefix = ""
): string[] {
  const missing: string[] = [];
  for (const [key, value] of Object.entries(data)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (Array.isArray(value)) {
      if (!schemaPaths.has(path)) {
        missing.push(path);
      }
      continue;
    }
    if (value !== null && typeof value === "object") {
      missing.push(
        ...validateDataPathsAgainstSchema(
          value as Record<string, unknown>,
          schemaPaths,
          path
        )
      );
    } else if (!schemaPaths.has(path)) {
      missing.push(path);
    }
  }
  return missing;
}
