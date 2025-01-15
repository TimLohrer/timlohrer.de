<script>
	import MagicCard from './magicUI/MagicCard.svelte';
    import projects from './../data/projects.json';
</script>

<div class="projectList">
	<h2>Projects</h2>
	<div class="projects">
		{#each projects as project}
			<MagicCard
				class="hover:border-[{project.brandColor}] hover:text-[{project.brandColor}]"
				gradientColor={project.gradientColor}
				gradientSize={300}
                onClick={() => window.open(project.url, '_blank')}
			>
				<div class="project">
					<div class="name">
						<img src={project.logoLocation} alt={project.name + "Logo"} />
						<p>{project.name}</p>
					</div>
					<p class="description">{@html project.description}</p>
					<div class="buttons"></div>
				</div>
			</MagicCard>
		{/each}
	</div>
</div>

<style>
	.projectList {
		display: flex;
		flex-direction: column;
	}

	.projectList h2 {
		font-family: 'SF-Mono-Bold';
		font-size: 2rem;
		margin-top: 5vh;
	}

	.projectList .projects {
		display: flex;
		flex-direction: row;
		gap: 1rem;
		margin-top: 1.5rem;
	}

	.projectList .projects .project {
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
		font-size: 11px;
	}

	@media (max-width: 800px) {
        .projectList {
            align-items: center;
            width: 100%;
        }

		.projectList h2 {
			text-align: center;
		}

		.projectList .projects {
			flex-direction: column;
			align-items: center;
		}
	}
</style>
