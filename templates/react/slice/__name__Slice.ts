import {createSlice} from 'redux-toolkit';
import {<%= Name %>InitialState} from './models';

const <%= Name %>Slice = createSlice({
    initialState: <%= Name %>InitialState,
    name: '<%= sliceName %>',
    reducers: {},
});


export const {} = <%= Name %>Slice.actions;

export default <%= Name %>Slice.reducer;