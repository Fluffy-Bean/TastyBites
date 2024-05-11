<script lang="ts">
    import { createEventDispatcher } from "svelte";

    import { ArrowArcLeft, ArrowArcRight } from "phosphor-svelte";

    const dispatcher = createEventDispatcher();
    const weekLabels = [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun",
    ];
    const monthLabels = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    export let notBefore: Date;
    export let selectedDate: Date;
    let todayDate = new Date();

    let viewingDate = new Date();
    let viewingYear = viewingDate.getFullYear();
    let viewingMonth = viewingDate.getMonth();

    $: firstDayOffset = new Date(viewingYear, viewingMonth, 0).getDay();
    $: monthLength = new Date(viewingYear, viewingMonth + 1, 0).getDate();

    $: isToday = (day: number) => {
        return (
            day === todayDate.getDate()
            && viewingMonth === todayDate.getMonth()
            && viewingYear === todayDate.getFullYear()
        );
    }
    $: isSelected = (day: number) => {
        return (
            selectedDate
            && day === selectedDate.getDate()
            && viewingMonth === selectedDate.getMonth()
            && viewingYear === selectedDate.getFullYear()
        );
    }
    $: isBefore = (day: number) => {
        const thisDate = new Date(viewingYear, viewingMonth, day);
        return notBefore && thisDate < notBefore;
    }

    function backMonth() {
        viewingMonth -= 1;
        updateDate();
    }
    function forwardsMonth() {
        viewingMonth += 1;
        updateDate();
    }
    function updateDate() {
        if (viewingMonth < 0 || viewingMonth > 11) {
            viewingDate = new Date(viewingYear, viewingMonth, new Date().getDate());
            viewingYear = viewingDate.getFullYear();
            viewingMonth = viewingDate.getMonth();
        } else {
            viewingDate = new Date();
        }
    }

    function dateSelected(event) {
        const day: number = event.target.getAttribute("data-day");
        selectedDate = new Date(viewingYear, viewingMonth, day);
        dispatcher("selected", { date: selectedDate });
    }

    // Full reference code:
    // https://www.geeksforgeeks.org/how-to-design-a-simple-calendar-using-javascript/
</script>


<div class="calendar">
    <div class="calendar-header">
        <p>{monthLabels[viewingMonth]}&nbsp;<span>{viewingYear}</span></p>
        <button on:click={backMonth}><ArrowArcLeft weight="fill" /></button>
        <button on:click={forwardsMonth}><ArrowArcRight weight="fill" /></button>
    </div>
    <div class="calendar-weeks">
        {#each weekLabels as label}
            <span>{label}</span>
        {/each}
    </div>
    <div class="calendar-days">
        {#each {length:firstDayOffset} as _}<div />{/each}
        {#each {length:monthLength} as _, day}
            <div class:today={isToday(day+1)} class:selected={isSelected(day+1)} class:before={isBefore(day+1)}>
                <button on:click={dateSelected} data-day={day+1}>{day+1}</button>
            </div>
        {/each}
    </div>
</div>
