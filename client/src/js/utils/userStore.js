let userStore = (() => {

    let storage = [];
    let itemStorage = {
        setItem: (key = "", value) => {
            let a = key;
            let obj = {
                [a]: value
            }
            storage.push(obj);
            //console.log(storage);
        },
        getItem: (key = "") => {
            let item = storage.find((obj) => {
                let value = obj[key];
                return value;
            });
            return item;
        },
        removeItem: (key = "") => {
            let index = storage.findIndex(obj => {
                return obj[key];
            });
            storage.splice(index, 1);
            //console.log(storage);
        },
        clear: () => {
            storage = [];
            //console.log(storage);
        }
    };

    return {
        itemStorage
    }
})();



module.exports = userStore;