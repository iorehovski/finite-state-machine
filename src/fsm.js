class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.fsm = config;
        this.ctState = this.fsm.initial;
        this.hyUndo = [];
        this.hyRedo = [];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.ctState;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if(this.fsm.states[state] != undefined){
            this.hyUndo.push(this.ctState);
            this.ctState = state;
            this.hyRedo = [];
        }
        else throw error;
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if(this.fsm.states[this.ctState].transitions[event] != undefined){
            this.hyUndo.push(this.ctState);
            this.ctState = this.fsm.states[this.ctState].transitions[event];
            this.hyRedo = [];
        }
        else throw error;
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.ctState = this.fsm.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
    //первый случай
        var tmp = [];
        if(event == undefined){
            var tmp = [];
            for(var key in this.fsm.states){
                tmp.push(key);
            }
            return tmp;
        }
    //по событию
        for(var keyState in this.fsm.states){
            for(var key in this.fsm.states[keyState].transitions){
                if(key === event){
                    tmp.push(keyState);
                }
            }
        }
    //если первые два случая не подошли - вернётся пустой массив
        return tmp;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if(this.hyUndo.length == 0) return false;
        this.hyRedo.push(this.ctState);
        for(var i = 0; i < this.hyUndo.length; i++){
            var tmp = this.hyUndo.pop();
            this.ctState = tmp;
        }
        return true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if(this.hyRedo.length == 0) return false;
        for(var i = 0; i < this.hyRedo.length; i++){
            this.ctState = this.hyRedo.pop();  
        }
        return true;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.hyRedo = [];
        this.hyUndo = [];
    }
}

module.exports = FSM;

/** @Created by iorehovski **/
