import { StatusValue } from '../../../../shared/domain/values/status.value';

export class Book {
    constructor(
        public readonly id: string,
        public readonly title: string,
        public readonly chapters: number,
        public readonly pages: number,
        public readonly publicationYear: number,
        public readonly authors: string[],
        public status: string = StatusValue.ACTIVE,
    ) {}

    deactivate(): void {
        this.status = StatusValue.INACTIVE;
    }
}
