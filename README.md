# smart_rocket_genetic_algo

This is a very basic implementation of genetic algorithm .

Here a random population of rockets learn how to reach a target over several generation through "evolution".

Each rocket has a DNA and each DNA has a set of genes. The genes tell the rocket how it should fly around . 
Initially all rockets fly randomly , but the ones that can reach closer to the targets are considered more fit 
and so have a higher probability to share their genes with the next generation. Eventually after a few generations
rockets stop flying randomly and start flying closer and closer to the target . There is also a small amount of 
mutation in play that randomly mutates some genes when they are being transfered to the next generation.

Its made in javascript using p5js library. A very minimalistic physics engine has been implementd to move the 
rockets around . 
