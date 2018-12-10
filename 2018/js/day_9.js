"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Node {
    constructor(val, next, prev) {
        this.val = val;
        this.next = next;
        this.prev = prev;
    }
}
class List {
    constructor(start_val, last_val) {
        this.len = 2;
        this.current = new Node(start_val, null, null);
        const last = new Node(last_val, this.current, this.current);
        this.current.next = last;
        this.current.prev = last;
    }
    move(off) {
        for (let i = 0; i < off; i++) {
            if (off > 0)
                this.current = this.current.next;
            else
                this.current = this.current.prev;
        }
    }
    search(off) {
        let node = this.current;
        if (off > 0) {
            for (let i = 0; i < off; i++)
                node = node.next;
        }
        else {
            for (let i = 0; i > off; i--)
                node = node.prev;
        }
        return node.val;
    }
    appendmove(off, n) {
        for (let i = 0; i < off - 1; i++)
            this.current = this.current.next;
        this.current.next = new Node(n, this.current.next, this.current);
        this.current.next.next.prev = this.current.next;
        this.current = this.current.next;
        this.len++;
    }
    deletemove(off) {
        if (off > 0) {
            for (let i = 0; i < off - 1; i++)
                this.current = this.current.next;
            this.current.next.next.prev = this.current;
            this.current.next = this.current.next.next;
        }
        else {
            for (let i = 0; i > off + 1; i--)
                this.current = this.current.prev;
            this.current.prev.prev.next = this.current;
            this.current.prev = this.current.prev.prev;
        }
        this.len--;
    }
    print() {
        const vals = [];
        let node = this.current;
        for (let i = 0; i < this.len; i++) {
            vals.push(node.val);
            node = node.next;
        }
        console.log(vals.join(' '));
    }
}
function high_score(player_n, last) {
    const players = Array(player_n).fill(0);
    const list = new List(0, 1);
    list.move(1);
    for (let n = 2, turn = 1; n <= last; n++, turn = (turn + 1) % player_n) {
        if (n % 23) {
            list.appendmove(2, n);
        }
        else {
            const val = list.search(-7);
            players[turn] += n + val;
            list.deletemove(-7);
        }
    }
    return players.sort((a, b) => b - a)[0];
}
function main() {
    const input = { player_n: 419, last: 71052 };
    const first = high_score(input.player_n, input.last);
    const second = high_score(input.player_n, input.last * 100);
    console.log('First:', first);
    console.log('Second:', second);
}
main();
