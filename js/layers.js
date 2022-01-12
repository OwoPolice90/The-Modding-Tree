addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: 
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
	    	11: {
			title:"Double Points"
			description: "Doubles your point gain"
			cost: new Decimal(10)
		},
		12: {
			title:"Prestige Power!"
			description: "Multiplies your point gain by 1 plus 0.25 times prestige points"
			cost: new Decimal(30)
			unlocked(){
				return hasUpgrade("p", 11)
			},
			effect() {
				return (player[this.layer].points.add(1).pow(0.25)).add(1)
			},
			effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }
		},
		13: {
			title:"Quintuple Points"
			description: "Quintuples your point gain"
			cost: new Decimal(250)
			unlocked(){
				return hasUpgrade("p", 12)
			},
		},
		14: {
			title:"Exponential Points"
			description: "Exponentiates Points by 1.25"
			cost: new Decimal(2500)
			unlocked() {
				return hasUpgrade("p", 13)
			},
		},
		15: {
			title:"Secondary Prestige Power!"
			description: "Multiplies yor point gain by 1 plus prestige points"
			cost: new Decimal(1000000)
			unlocked() {
				return hasUpgrade("p", 14)
			},
		},
    })    		
