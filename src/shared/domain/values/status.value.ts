export class StatusValue {
    static readonly ACTIVE = 'ACTIVE';
    static readonly INACTIVE = 'INACTIVE';

    static validate(value: string): boolean {
        return value === StatusValue.ACTIVE || value === StatusValue.INACTIVE;
    }

    static ensureValid(value: string): string {
        if (!StatusValue.validate(value)) {
            throw new Error(`Invalid status value: ${value}`);
        }
        return value;
    }
}
