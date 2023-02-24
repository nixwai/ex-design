import Card from './src/card.vue'

Card.install = function (Vue) {
  Vue.component(Card.name, Card)
}

export const ExCard = Card

export default ExCard
