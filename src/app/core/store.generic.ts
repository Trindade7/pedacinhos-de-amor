import { Logger as logger } from './logger';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { StoreModel } from './models/store-generic-model';

export abstract class StoreGeneric<T extends StoreModel> {
    protected bs: BehaviorSubject<T>;
    state$: Observable<T>;
    state: T;
    previous: T | undefined;
    protected abstract store: string;

    constructor (
        initialValue: Partial<T>,
    ) {
        this.bs = new BehaviorSubject(initialValue as T);
        this.state$ = this.bs.asObservable();
        this.state = initialValue as T;

        this.state$.subscribe(s => this.state = s);
    }

    patch(newValue: Partial<T>, event: string = 'not specified'): void {
        this.previous = this.state;
        const newState = Object.assign({}, this.state, newValue);
        logger.collapsed(`[${this.store}] patch [event: ${event}]`,
            [
                ...['change', newValue, '\n'],
                ...['previous', this.previous, '\n'],
                ...['next', newState, '\n']
            ],
        );

        this.bs.next(newState);
    }

    setValue(newValue: Partial<T>, event: string = 'not specified'): void {
        this.previous = this.state;
        const newState = Object.assign({}, newValue) as T;

        logger.collapsed(`[${this.store}] [setValue] [event: ${event}]`,
            [
                ...['change', newValue],
                ...['previous', this.previous],
                ...['next', newState]
            ],
        );

        this.bs.next(newState);
    }

    get loading$(): Observable<boolean> {
        return this.state$.pipe(
            map(state => state.loading)
        );
    }

    get status$(): Observable<string> {
        return this.state$.pipe(
            map(state => state.status)
        );
    }
    get error$(): Observable<Error | null> {
        return this.state$.pipe(
            map(state => state.error)
        );
    }
}
