export async function transformSchema(schema: { properties: Record<string, any> }) {
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
