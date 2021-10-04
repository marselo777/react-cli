
type DefaultSchema = {
    properties: Record<string, Record<string, any>>
}

export async function transformSchema(schema?: DefaultSchema) {
    return Object.entries(schema?.properties || {}).reduce(
        (prev, [key, value]) => {
            if (value?.default) {
                return { ...prev, [key]: value.default };
            }
            return {
                [key]: null,
            };
        },
        {}
    );
}
