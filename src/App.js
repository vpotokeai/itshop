
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Items from "./components/Items";
import Categories from "./components/Categories";
import ShowFullItem from "./components/ShowFullItem";


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      orders: [],
      currentItems: [],
      items: [
        {
          id: 1,
          title: 'Телевизор',
          img: 'televizor_digma.jpg',
          desc: 'Телевизор Digma DM-LED24MR15, 24", HD READY, белый',
          category: 'televizor',
          price: '13999'
        },
        {
          id: 2,
          title: 'Ноутбук',
          img: 'notebook_digma.jpg',
          desc: 'Ноутбук DIGMA EVE 15 C400, 15.5",IPS, Intel Celeron N3350 1.1ГГц, 4ГБ, 128ГБ SSD, Intel HD Graphics 500, Windows 10 Home',
          category: 'notebook',
          price: '21999'
        },
        {
          id: 3,
          title: 'Кронштейн',
          img: 'brackets.jpg',
          desc: 'Кронштейн для телевизора Onkron SN16 черный 40"-65" макс.68кг настенный наклон',
          category: 'brackets',
          price: '1699'
        }
      ],

      showFullItem: false,
      fullItem: {}
    }
    this.currentItems = this.state.items
    this.addToOrder = this.addToOrder.bind(this)
    this.deleteOrder = this.deleteOrder.bind(this)
    this.chooseCategory = this.chooseCategory.bind(this)
    this.onShowItem = this.onShowItem.bind(this)
  }
  render () {
    return (
    <div className="wrapper">
      <Header orders={this.state.orders} onDelete={this.deleteOrder} />
      <Categories chooseCategory={this.chooseCategory}/>
      <Items onShowItem={this.onShowItem} items={this.state.currentItems} onAdd={this.addToOrder} />

      {this.state.showFullItem && <ShowFullItem onAdd={this.addToOrder} onShowItem={this.onShowItem} item={this.state.fullItem} />}
      <Footer />
    </div>
   );
  }

  onShowItem(item) {
    this.setState({fullItem: item})
    this.setState({showFullItem: !this.state.showFullItem})
  }

  chooseCategory(category) {
    if (category === 'all') {
      this.setState({currentItems: this.state.items})
      return
    }

    this.setState({
      currentItems: this.state.items.filter(el => el.category === category)
    })
  }

  deleteOrder(id) {
       this.setState({orders: this.state.orders.filter(el => el.id !== id)})
  }
  
  addToOrder(item) {
    let isInArray = false
    this.state.orders.forEach(el => {
      if (el.id === item.id)
      isInArray = true
    })

    if (!isInArray)
    this.setState({orders: [...this.state.orders, item] })
  }
}

export default App;
