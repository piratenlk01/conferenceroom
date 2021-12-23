

declare namespace models {
    export class TreeNodeModel<T> {
        public label: string;
        public data: T;
        public icon: string;
        public expandedIcon: string;
        public collapsedIcon: string;
        public children: TreeNodeModel<T>[];
        public leaf: boolean;
        public expanded: boolean;
        public type: string;
        public parent: TreeNodeModel<T>;
        public partialSelected: boolean;
        public styleClass: string;
        public draggable: boolean;
        public droppable: boolean;
        public selectable: boolean;
        public key: string;
    }
}

