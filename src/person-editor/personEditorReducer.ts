/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Person } from "../types/person";

interface Metadata {
    isDirty: boolean,
    isValid: boolean
}

interface ReducerState {
    person: Person | null,
    metadata: Metadata
}

interface SetPersonAction {
    type: "set-intitial-person",
    payload: Person
}

interface SetPropertyAction {
    type: 'set-property',
    payload: { name: string, value: unknown }
}

interface SetPropertiesAction {
    type: 'set-properties',
    payload: Partial<Person>
}

type SomeAction = SetPersonAction | SetPropertyAction | SetPropertiesAction;

export function personEditorReducer(
    state: ReducerState,
    action: SomeAction
): ReducerState {
    switch (action.type) {
        case 'set-intitial-person':
            return { ...state, person: action.payload };
            break;
        case 'set-property':
            return { 
                ...state,
                metadata: { ...state.metadata, isDirty: true },
                person: { 
                    ...state.person!, 
                    [action.payload.name]: action.payload.value
                }
            };
            break;
            case 'set-properties':
                return { 
                    ...state,
                    metadata: { ...state.metadata, isDirty: true },
                    person: { 
                        ...state.person!, 
                        ...action.payload
                    }
                };
                break;
            default:
            return state
    }
}
