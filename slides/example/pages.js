[
	{
		"image": "slides/example/img/goodimage.png",
		"caption": "This is a good image.",

		"duration": 2,
		"next": 1,

		"buttons": [
			{
				"value": "Fast! Fast! Fast! Fast!",
				"next": 2
			},
			{
				"value": "????????",
				"next": 3
			},
			{
				"value": "Take a chance",
				"next": "randomItem([[4,0.8], [5,0.2]])"
			}
		],
		"buttonOrder": "shuffle(page.buttons)"
 	}, 
	{
		"caption": "You were too slow!"
	},
	{
		"caption": "You managed to press the button in time!"
	},
	{
		"caption": "Yes.",
		"duration": "randomInt(10,30)",
		"next": 4
	},
	{
		"caption": "Bye!"
	},
	{
		"caption": "You're lucky!"
	}
]
