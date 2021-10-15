const UserForm = require("./UserForm")

// @ponicode
describe("componentDidMount", () => {
    let inst

    beforeEach(() => {
        inst = new UserForm.default({ delete: true, add: false, editable: false, firstname: "Pierre Edouard", lastname: "Murray-Kynynmound", email: "something@example.com", image: "http://placeimg.com/640/480/abstract" })
    })

    test("0", () => {
        let callFunction = () => {
            inst.componentDidMount()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("onSavePress", () => {
    let inst

    beforeEach(() => {
        inst = new UserForm.default({ delete: false, add: false, editable: false, firstname: "Michael", lastname: "Al Saud", email: "something.example.com", image: "http://placeimg.com/640/480/transport" })
    })

    test("0", () => {
        let callFunction = () => {
            inst.onSavePress()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("onAddPress", () => {
    let inst

    beforeEach(() => {
        inst = new UserForm.default({ delete: false, add: true, editable: true, firstname: "George", lastname: "Al Saud", email: "user@host:300", image: "http://placeimg.com/640/480/cats" })
    })

    test("0", () => {
        let callFunction = () => {
            inst.onAddPress()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("onDeletePress", () => {
    let inst

    beforeEach(() => {
        inst = new UserForm.default({ delete: false, add: true, editable: false, firstname: "Pierre Edouard", lastname: "Baziz", email: "user@host:300", image: "http://placeimg.com/640/480/transport" })
    })

    test("0", () => {
        let callFunction = () => {
            inst.onDeletePress()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("onUpdatingProfileFail", () => {
    let inst

    beforeEach(() => {
        inst = new UserForm.default({ delete: false, add: false, editable: true, firstname: "Edmond", lastname: "Baziz", email: "user@host:300", image: "http://placeimg.com/640/480/transport" })
    })

    test("0", () => {
        let callFunction = () => {
            inst.onUpdatingProfileFail()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("onUpdatingProfileSuccess", () => {
    let inst

    beforeEach(() => {
        inst = new UserForm.default({ delete: false, add: true, editable: true, firstname: "Edmond", lastname: "Baziz", email: "user@host:300", image: "http://placeimg.com/640/480/abstract" })
    })

    test("0", () => {
        let callFunction = () => {
            inst.onUpdatingProfileSuccess()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("selectPhotoTapped", () => {
    let inst

    beforeEach(() => {
        inst = new UserForm.default({ delete: true, add: true, editable: true, firstname: "Pierre Edouard", lastname: "Al Saud", email: "TestUpperCase@Example.com", image: "http://placeimg.com/640/480/transport" })
    })

    test("0", () => {
        let callFunction = () => {
            inst.selectPhotoTapped()
        }
    
        expect(callFunction).not.toThrow()
    })
})
