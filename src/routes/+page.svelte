<script>
	import MagicCard from '../lib/components/magicUI/MagicCard.svelte';
	import GradualSpacingName from '../lib/components/magicUI/GradualSpacingName.svelte';
	import BlurFade from '../lib/components/magicUI/BlurFade.svelte';
	import GalaxyBot from './../lib/assets/galaxybot.png';

	// not sure if there is a better way but this works :)
	let age = new Date().getFullYear() - 2006;
	if (new Date().getMonth() < 3 || (new Date().getMonth() === 3 && new Date().getDate() < 20)) {
		age -= 1;
	}

	let experienceYears = new Date().getFullYear() - 2020;
</script>

<svelte:head>
	<title>Tim Lohrer | Home</title>
</svelte:head>

<div class="home">
	<!-- Please don't ask :) -->
	<p style="color: transparent;">.</p>

	<section id="header" class="header">
		<div class="title">
			<BlurFade delay={0.35} yOffset={12}>
				<h1>Hello 👋</h1>
			</BlurFade>
			<BlurFade delay={0.5} yOffset={12}>
				<div class="i-am-container">
					<h1>I am</h1>
					<GradualSpacingName words="Tim Lohrer" duration={1.25} />
					<h1>.</h1>
				</div>
			</BlurFade>
		</div>
		<div class="info">
			<BlurFade delay={0.95} yOffset={8}>
				<p>
					A {age} year old full stack developer from Germany.<br />
					I hove over {experienceYears}+ years of experience in various programming languages, tools
					and tech-stacks.<br />
					Projects I have worked on include ChatBots, WebApps, cross-platform mobile and desktop Apps,
					REST API's and more.<br />
					I am always eager to learn new things, take on bigger challenges, and improve my skills.<br
					/>
				</p>
			</BlurFade>
			<BlurFade delay={1.3} yOffset={8}>
				<h2>Projects</h2>
				<div class="projects">
					<MagicCard
						class="hover:border-[#5866f2] hover:text-[#5866f2]"
						gradientColor="#333a80"
						gradientSize={300}
					>
						<div class="project">
							<div class="name">
								<img src={GalaxyBot} alt="GalaxyBot" />
								<p>GalaxyBot</p>
							</div>
							<p class="description">GalaxyBot is a Discord Bot with over 1.7M users centered around support systems, moderation & advanced team management.</p>
							<div class="buttons">
								
							</div>
						</div>
					</MagicCard>
				</div>
			</BlurFade>
		</div>
	</section>
</div>

<style>
	.header {
		display: flex;
		flex-direction: column;
		padding: 2rem 10rem;
		height: 100%;
		align-items: start;
	}

	.header .title {
		margin-top: 10vh;
	}

	.header h1 {
		display: flex;
		flex-direction: row;
		font-family: 'SF-Mono-Bold';
		font-size: 5rem;
	}

	.header .i-am-container {
		display: flex;
		flex-direction: row;
	}

	.header .info {
		margin-top: 10vh;
	}

	.header .info h2 {
		font-family: 'SF-Mono-Bold';
		font-size: 2rem;
		margin-top: 5vh;
	}

	.header .projects {
		display: flex;
		flex-direction: row;
		gap: 1rem;
		margin-top: 1.5rem;
	}

	.header .projects .project {
		display: flex;
		flex-direction: column;
		align-items: start;
		justify-content: start;
		padding: 15px;
		height: 100%;
		width: 100%;
		cursor: pointer;
		transition-duration: 300ms;
	}

	.project .name {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 1rem;
	}

	.project .name img {
		width: 50px;
		height: 50px;
	}

	.project .name p {
		font-family: 'SF-Mono-Bold';
		font-size: 1.35rem;
	}

	.project .description {
		margin-top: 5px;
		font-size: 12px;
	}

	@media (max-width: 700px) {
		.header {
			padding: 1.5rem;
		}

		.header .title {
			margin-top: 5vh;
		}

		.header h1 {
			font-size: 2rem;
		}

		.header .info p:nth-child(1) {
			text-align: center;
		}

		.info h2 {
			text-align: center;
		}

		.header .projects {
			flex-direction: column;
			align-items: center;
		}
	}
</style>
