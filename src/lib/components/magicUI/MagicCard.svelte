<script lang="ts">
	import { Motion, useMotionValue, useMotionTemplate } from 'svelte-motion';
	import { onMount } from 'svelte';
	import { cn } from '$lib/utils';

	export let gradientSize: number = 200;
	export let gradientColor: string = '#262626';
	export let gradientOpacity: number = 0.8;
	export let onClick: () => void;
	let className: string = '';
	export { className as class };

	let gradSize = useMotionValue(gradientSize);
	let gradColor = useMotionValue(gradientColor);
	let mouseX = useMotionValue(-gradientSize);
	let mouseY = useMotionValue(-gradientSize);

	function handleMouseMove(e: MouseEvent) {
		const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
		mouseX.set(e.clientX - rect.left);
		mouseY.set(e.clientY - rect.top);
	}

	function handleMouseLeave() {
		mouseX.set(-gradientSize);
		mouseY.set(-gradientSize);
	}

	onMount(() => {
		mouseX.set(-gradientSize);
		mouseY.set(-gradientSize);
	});
	let bg = useMotionTemplate`radial-gradient(${gradSize}px circle at ${mouseX}px ${mouseY}px, ${gradColor}, transparent 100%)`;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- I have added py-4 in below code, you can customize the component as per needs -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	on:mousemove={handleMouseMove}
	on:mouseleave={handleMouseLeave}
	on:click={onClick}
	class={cn(
		'main-card group flex size-full rounded-xl bg-neutral-100 dark:bg-neutral-900 border text-black dark:text-white',
		className
	)}
>
	<div class="relative z-10">
		<!-- Default  -->
		<slot>
			<div class="flex items-center justify-center h-full text-center">
				<p class="text-2xl">Magic Card</p>
			</div>
		</slot>
	</div>
	<Motion
		style={{
			background: bg,
			opacity: gradientOpacity
		}}
		let:motion
	>
		<div
			use:motion
			class="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
		/>
	</Motion>
</div>

<style>
	.size-full {
		min-width: 500px;
		min-height: 200px;
	}

	.main-card {
		transition: all 0.3s;
	}

	.main-card:hover {
		transform: rotate3d(0, 2, 0, 10deg);
	}

	@media (max-width: 800px) {
		.size-full {
			min-width: 430px;
			transform: scale(-0.75) rotate(180deg);
		}
	}
</style>
