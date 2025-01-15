<script>
    // only for the language colors :(
    // @ts-nocheck

	import MagicCard from './magicUI/MagicCard.svelte';
    import projects from './../data/projects.json';
	import languageColors from '../data/language_colors.json';
	import { onMount } from 'svelte';
</script>

<div class="projectList">
	<h2>Projects</h2>
	<div class="projects" id="projects">
		{#each projects as project}
			<MagicCard
				class="hover:border-[{project.brandColor}] hover:text-[{project.brandColor}]"
				gradientColor={project.gradientColor}
				gradientSize={300}
                onClick={() => window.open(project.url, '_blank')}
			>
				<div class="project">
                    <div class="mainContent">
                        <div class="name">
                            <img src={project.logoLocation} alt={project.name} />
                            <p>{project.name}</p>
                        </div>
                        <p class="description">{@html project.description}</p>
                    </div>
					<div class="languages">
                        {#each project.languages as language}
                            <div class="language">
                                <span style={"background-color: " + languageColors[language.toLowerCase()] + ";"} />
                                <p>{language}</p>
                            </div>
                        {/each}
                    </div>
				</div>
			</MagicCard>
		{/each}
	</div>
</div>

<style>
	.projectList {
		display: flex;
		flex-direction: column;
        width: 100%;
	}

	.projectList h2 {
		font-family: 'SF-Mono-Bold';
		font-size: 2rem;
		margin-top: 5vh;
	}

    .projectList .projects {
		display: grid;
        max-width: 100vw;
        height: auto;
		margin-top: 1.5rem;
        gap: 1rem;
        grid-template-columns: repeat(auto-fill, minmax(450px, 600px));
	}

    /* This is for the horizontal scroll variant. Might use this in the future and it was a pita to get working :) */
	/* .projectList .projects {
		display: flex;
        overflow-x: scroll;
        scroll-behavior: smooth;
        width: calc(100vw - 10rem);
        height: max-content;
		margin-top: 1.5rem;
        scrollbar-color: transparent transparent;
	} */

	.projectList .projects .project {
		display: flex;
		flex-direction: column;
		align-items: start;
		justify-content: space-between;
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

    .project .languages {
        display: flex;
        flex-direction: row;
        gap: 10px;
        margin-top: 5px;
    }

    .project .languages .language {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 5px;
    }

    .project .languages .language span {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        display: inline-block;
    }

    .project .languages .language p {
        font-size: 10px;
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
            display: flex;
			flex-direction: column;
			align-items: center;
            gap: 0;
            margin-top: 0;
		}
	}
</style>
