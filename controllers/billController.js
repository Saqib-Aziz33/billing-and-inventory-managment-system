const {Bill} = require('../models/bill')
const {Item} = require('../models/item')


exports.allBills = async (req, res) => {
    try {
        let bills
        if(req.user.isAdmin){
            bills = await Bill.find({})
        }
        else{
            bills = await Bill.find({author: req.user._id})
        }
        res.render('bill/index', {bills})
    } catch (error) {
        res.send(error.message)
    }
}

exports.renderBillPage = async (req, res) => {
    try {
        const items = await Item.find({})
        res.render('bill/new', {items})
    } catch (error) {
        res.send(error.message)
    }
}
// :id
exports.bill = async (req, res) => {
    try {
        const bill = await Bill.findById(req.params.id)
        res.render('bill/bill', {bill})
    } catch (error) {
        res.send(error.message)
    }
}

exports.printHTML = async (req, res) => {
    try {
        const bill = await Bill.findById(req.params.id)
        res.render('bill/print', {bill})
    } catch (error) {
        res.send(error.message)
    }
}

exports.deleteBill = async (req, res) => {
    try {
        const bill = await findBill(req.params.id)
        if(!bill){
            req.flash('error', 'bill not found')
            return res.redirect('/bill')
        }
        await Bill.findByIdAndDelete(req.params.id)
        res.redirect('/bill')
    } catch (error) {
        res.send(error.message)
    }
}

exports.createBill = async (req, res) => {
    try {
        // find items
        const items = await Item.find({_id: {$in: req.body.item.id}})
        // collect items and quantity
        const itemsCollection = items.map((item, index) => {
            return {
                name: item.name,
                price: item.price,
                quantity: req.body.item.quantity[index],
                item_id: item._id,
                total: item.price * req.body.item.quantity[index]
            }
        })
        // create bill
        const bill = new Bill({
            customer_name: req.body.customer_name,
            items: itemsCollection,
            author: req.user._id,
            grandTotal: calculateGrandTotal(itemsCollection)
        })
        await bill.save()
        res.redirect(`/bill/${bill._id}`)
    } catch (error) {
        res.send(error.message)
    }
}

function calculateGrandTotal(collection){
    let total = 0
    for(let item of collection){
        total += item.total
    }
    return total
}

async function findBill(id){
    const bill = await Bill.findById(id)
    if(!bill){
        return false
    }
    return bill
}