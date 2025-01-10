import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    HttpException,
    InternalServerErrorException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            catchError((error) => {
                if (error instanceof HttpException) {
                    return throwError(() => error);
                }

                console.error('Unhandled error:', error); // Log de errores
                return throwError(
                    () => new InternalServerErrorException('Something went wrong. Please try again later.')
                );
            }),
        );
    }
}
