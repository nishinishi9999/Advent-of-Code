interface Operator {
    op   :string;
    args :string[] | number[];
}

interface Register {
    [propName :string] :string | number;
}

interface Query {
    snd :number[];
    rcv :number[];
}


const set_reg = (r :Register, i :number, val :string | number) :Register =>
    Object.assign({}, r, {[i]: val});

const get_val = (r :Register, a :string | number) :(string | number) =>
    typeof(a) === 'string' ? r[a] : a;

const append_snd_q = (q :Query, val :number) : Query => ({
    snd: q.snd.concat(val),
    rcv: q.rcv
});

// @ts-ignore
const _snd = (ops, r, i, a)         => opcode(ops, r, i+1, get_val(r, a));
// @ts-ignore
const _rcv = (ops, r, i, snd, a)    => opcode(ops, r, get_val(r,a) === 0 ? i+1 : 100, snd);
// @ts-ignore
const _set = (ops, r, i, snd, a, b) => opcode(ops, set_reg( r, a,        get_val(r, b) ), i+1, snd);
// @ts-ignore
const _add = (ops, r, i, snd, a, b) => opcode(ops, set_reg( r, a, r[a] + get_val(r, b) ), i+1, snd);
// @ts-ignore
const _mul = (ops, r, i, snd, a, b) => opcode(ops, set_reg( r, a, r[a] * get_val(r, b) ), i+1, snd);
// @ts-ignore
const _mod = (ops, r, i, snd, a, b) => opcode(ops, set_reg( r, a, r[a] % get_val(r, b) ), i+1, snd);
// @ts-ignore
const _jgz = (ops, r, i, snd, a, b) => opcode(ops, r, get_val(r, a) === 0 ? i+1 : i+get_val(r, b), snd);

export function opcode(ops :Operator[], r :Register, i :number, snd :number) :number {
    if(i >= ops.length) return snd;
    
    switch(ops[i].op) {
        case 'snd': return _snd(ops, r, i, ops[i].args[0]);
        case 'rcv': return _rcv(ops, r, i, snd, ops[i].args[0]);
        case 'set': return _set(ops, r, i, snd, ops[i].args[0], ops[i].args[1]);
        case 'add': return _add(ops, r, i, snd, ops[i].args[0], ops[i].args[1]);
        case 'mul': return _mul(ops, r, i, snd, ops[i].args[0], ops[i].args[1]);
        case 'mod': return _mod(ops, r, i, snd, ops[i].args[0], ops[i].args[1]);
        case 'jgz': return _jgz(ops, r, i, snd, ops[i].args[0], ops[i].args[1]);
        default   : throw Error('Unrecognized opcode: ' + ops[i].op);
    }
}

// @ts-ignore
const __snd = (ops, r, i, q, a) => _opcode( ops, r, i+1, append_snd_q (q, get_val(r, a) ) );
// @ts-ignore
const __rcv = (ops, r, i, q, a) => {
// @ts-ignore
    switch(q.rcv.length > 0) {
        case true : return _opcode(ops, set_reg( r, a, q.rcv.shift() ), i+1, q);
        default   : return { r: r, i: i, q: q.snd, stopped: false };
    }
};

// @ts-ignore
const __set = (ops, r, i, q, a, b) => _opcode(ops, set_reg( r, a, get_val(r, b) ), i+1, q);
// @ts-ignore
const __add = (ops, r, i, q, a, b) => _opcode(ops, set_reg( r, a, <number>r[a] + get_val(r, b) ), i+1, q);
// @ts-ignore
const __mul = (ops, r, i, q, a, b) => _opcode(ops, set_reg( r, a, <number>r[a] * get_val(r, b) ), i+1, q);
// @ts-ignore
const __mod = (ops, r, i, q, a, b) => _opcode(ops, set_reg( r, a, <number>r[a] % get_val(r, b) ), i+1, q);
// @ts-ignore
const __jgz = (ops, r, i, q, a, b) => _opcode(ops, r, get_val(r, a) > 0 ? i+get_val(r, b) : i+1, q);

// @ts-ignore
export function _opcode(ops, r, i, q) {
    if(i >= ops.length) return { r: r, i: i, q: q.snd, stopped: true };
    //console.log(r.id, i, ops[i], q.snd.length, q.rcv.length);
    
    switch(ops[i].op) {
        case 'snd': return __snd(ops, r, i, q, ops[i].args[0]);
        case 'rcv': return __rcv(ops, r, i, q, ops[i].args[0]);
        case 'set': return __set(ops, r, i, q, ops[i].args[0], ops[i].args[1]);
        case 'add': return __add(ops, r, i, q, ops[i].args[0], ops[i].args[1]);
        case 'mul': return __mul(ops, r, i, q, ops[i].args[0], ops[i].args[1]);
        case 'mod': return __mod(ops, r, i, q, ops[i].args[0], ops[i].args[1]);
        case 'jgz': return __jgz(ops, r, i, q, ops[i].args[0], ops[i].args[1]);
        default   : throw Error('Unrecognized opcode: ' + <string>ops[i].op);
    }
}
