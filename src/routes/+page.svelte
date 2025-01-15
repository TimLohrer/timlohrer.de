<script>
	import GradualSpacingName from '../lib/components/magicUI/GradualSpacingName.svelte';
	import BlurFade from '../lib/components/magicUI/BlurFade.svelte';
	import ProjectList from '$lib/components/ProjectList.svelte';

	// not sure if there is a better way but this works :)
	let age = new Date().getFullYear() - 2006;
	if (new Date().getMonth() < 3 || (new Date().getMonth() === 3 && new Date().getDate() < 20)) {
		age -= 1;
	}

	let experienceYears = new Date().getFullYear() - 2020;
</script>

<svelte:head>
	<title>Tim Lohrer | Portfolio</title>
</svelte:head>

<div class="home">
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
				I have over {experienceYears}+ years of experience in various programming languages, tools
				and tech-stacks.<br />
				Projects I have worked on include ChatBots, WebApps, cross-platform mobile and desktop Apps,
				REST API's and more.<br />
				I am always eager to learn new things, take on bigger challenges, and improve my skills.<br
				/>
			</p>
		</BlurFade>
		<BlurFade delay={1.3} yOffset={8}>
			<ProjectList />
		</BlurFade>
	</div>
</div>

<style>
	.home {
		display: flex;
		flex-direction: column;
		width: 100%;
		padding: 2rem 10rem;
		align-items: start;
		overflow-y: scroll;
		overflow-x: hidden;
	}

	.home .title {
		margin-top: 10vh;
	}

	.home h1 {
		display: flex;
		flex-direction: row;
		font-family: 'SF-Mono-Bold';
		font-size: 5rem;
	}

	.home .i-am-container {
		display: flex;
		flex-direction: row;
	}

	.home .info {
		margin-top: 10vh;
	}

	@media (max-width: 800px) {
		.home {
			padding: 1.5rem;
		}

		.home .title {
			margin-top: 5vh;
		}

		.home h1 {
			font-size: 1.75rem;
		}

		.home .info {
			width: 100%;
		}

		.home .info p:nth-child(1) {
			text-align: center;
		}
	}
</style>
