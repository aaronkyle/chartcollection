﻿// # C3 Butterfly Execution Flow
// _Demonstrates a Butterfly Caller/Callee flow chart for program execution_.

// ## Example data sets for function-level control flow graph.

// Function records contain an `id`, their `name`, and the name of the `module` they belong to.
interface FunctionRecord {
    id: number;
    name: string;
    module: string; // Not used in this example
}
// Function call links records contain the function id for the `source` and `target` of the call.
// `source` is the **caller** and `target` is the **callee**.
// `value` is the total amount of time for the function call (and any nested calls).
interface CFGLinkRecord {
    source: number;
    target: number;
    value: number;
}
// Example data sets
var cfg_datasets = {
    libpthread: {
        functions: [{ "id": 255, "name": "start_thread", "module": "libpthread-2.17.so" }, { "id": 318, "name": "libpthread-2.17.so@56e0", "module": "libpthread-2.17.so" }, { "id": 321, "name": "libpthread-2.17.so@55c0", "module": "libpthread-2.17.so" }, { "id": 325, "name": "(__kmp_launch_worker, void)", "module": "libomp.so" }, { "id": 345, "name": "(__kmp_itt_thr_name_set_init_3_0, const char, int)", "module": "libomp.so" }, { "id": 346, "name": "(__kmp_itt_thread_set_name_init_3_0, const char)", "module": "libomp.so" }, { "id": 350, "name": "libomp.so@17270", "module": "libomp.so" }, { "id": 352, "name": "__GI___pthread_mutex_lock", "module": "libpthread-2.17.so" }, { "id": 354, "name": "__lll_lock_wait", "module": "libpthread-2.17.so" }, { "id": 366, "name": "libomp.so@16ee0", "module": "libomp.so" }, { "id": 477, "name": "libomp.so@16e90", "module": "libomp.so" }, { "id": 479, "name": "__pthread_mutex_unlock", "module": "libpthread-2.17.so" }, { "id": 481, "name": "__lll_unlock_wake", "module": "libpthread-2.17.so" }, { "id": 502, "name": "(__kmp_set_stack_info, int, kmp_info)", "module": "libomp.so" }, { "id": 503, "name": "libomp.so@16c90", "module": "libomp.so" }, { "id": 506, "name": "libpthread-2.17.so@5690", "module": "libpthread-2.17.so" }, { "id": 508, "name": "libomp.so@168a0", "module": "libomp.so" }, { "id": 510, "name": "libpthread-2.17.so@5700", "module": "libpthread-2.17.so" }, { "id": 512, "name": "pthread_getaffinity_np@@GLIBC_2.3.4", "module": "libpthread-2.17.so" }, { "id": 521, "name": "libpthread-2.17.so@5540", "module": "libpthread-2.17.so" }, { "id": 524, "name": "libomp.so@17110", "module": "libomp.so" }, { "id": 527, "name": "libpthread-2.17.so@5430", "module": "libpthread-2.17.so" }, { "id": 530, "name": "__kmp_launch_thread", "module": "libomp.so" }, { "id": 541, "name": "__kmp_fork_barrier(int, int)", "module": "libomp.so" }, { "id": 547, "name": "__kmp_suspend_64", "module": "libomp.so" }, { "id": 555, "name": "libomp.so@16a30", "module": "libomp.so" }, { "id": 567, "name": "__pthread_mutex_unlock_usercnt", "module": "libpthread-2.17.so" }, { "id": 568, "name": "__pthread_enable_asynccancel", "module": "libpthread-2.17.so" }, { "id": 569, "name": "__pthread_disable_asynccancel", "module": "libpthread-2.17.so" }, { "id": 570, "name": "__pthread_mutex_cond_lock", "module": "libpthread-2.17.so" }, { "id": 583, "name": "__kmp_get_global_thread_id_reg", "module": "libomp.so" }, { "id": 603, "name": "__nptl_deallocate_tsd", "module": "libpthread-2.17.so" }, { "id": 606, "name": "libpthread-2.17.so@5620", "module": "libpthread-2.17.so" }, { "id": 615, "name": "libpthread-2.17.so@5770", "module": "libpthread-2.17.so" }, { "id": 782, "name": "libomp.so@16940", "module": "libomp.so" }, { "id": 805, "name": "__kmp_allocate_team", "module": "libomp.so" }, { "id": 810, "name": "__kmp_allocate_thread", "module": "libomp.so" }, { "id": 811, "name": "__kmp_create_monitor", "module": "libomp.so" }, { "id": 824, "name": "libomp.so@16860", "module": "libomp.so" }, { "id": 827, "name": "libpthread-2.17.so@5520", "module": "libpthread-2.17.so" }, { "id": 836, "name": "libpthread-2.17.so@57c0", "module": "libpthread-2.17.so" }, { "id": 844, "name": "libpthread-2.17.so@5790", "module": "libpthread-2.17.so" }, { "id": 846, "name": "do_clone.constprop.4", "module": "libpthread-2.17.so" }, { "id": 847, "name": "libpthread-2.17.so@5420", "module": "libpthread-2.17.so" }, { "id": 910, "name": "__kmp_create_worker", "module": "libomp.so" }, { "id": 927, "name": "main", "module": "a.out" }, { "id": 945, "name": "a.out@400600", "module": "a.out" }, { "id": 950, "name": "__GI_exit", "module": "libc-2.17.so" }, { "id": 951, "name": "__run_exit_handlers", "module": "libc-2.17.so" }, { "id": 953, "name": "_dl_fini", "module": "ld-2.17.so" }, { "id": 960, "name": "__kmp_internal_end_dtor", "module": "libomp.so" }, { "id": 970, "name": "(__kmp_reap_thread, kmp_info, int)", "module": "libomp.so" }, { "id": 977, "name": "__kmp_str_format", "module": "libomp.so" }, { "id": 997, "name": "libomp.so@16b90", "module": "libomp.so" }, { "id": 1012, "name": "libomp.so@170b0", "module": "libomp.so" }, { "id": 1015, "name": "_pthread_cleanup_push", "module": "libpthread-2.17.so" }, { "id": 1016, "name": "__pthread_cleanup_pop", "module": "libpthread-2.17.so" }, { "id": 1017, "name": "__free_tcb", "module": "libpthread-2.17.so" }, { "id": 1028, "name": "libomp.so@171b0", "module": "libomp.so" }, { "id": 1034, "name": "__kmp_cleanup", "module": "libomp.so" }, { "id": 1041, "name": "__kmp_runtime_destroy", "module": "libomp.so" }, { "id": 1042, "name": "__kmp_itt_destroy()", "module": "libomp.so" }, { "id": 1046, "name": "libomp.so@171f0", "module": "libomp.so" }, { "id": 1092, "name": "__do_global_dtors_aux", "module": "libpthread-2.17.so" }, { "id": 1093, "name": "libpthread-2.17.so@5880", "module": "libpthread-2.17.so" }, { "id": 1095, "name": "deregister_tm_clones", "module": "libpthread-2.17.so" }, { "id": 1096, "name": "_fini", "module": "libpthread-2.17.so" }, { "id": 1401, "name": "_dl_init", "module": "ld-2.17.so" }, { "id": 1402, "name": "_init", "module": "libpthread-2.17.so" }, { "id": 1403, "name": "__pthread_initialize_minimal", "module": "libpthread-2.17.so" }, { "id": 1405, "name": "__libc_sigaction", "module": "libpthread-2.17.so" }, { "id": 1412, "name": "libpthread-2.17.so@57f0", "module": "libpthread-2.17.so" }, { "id": 1415, "name": "libpthread-2.17.so@54d0", "module": "libpthread-2.17.so" }, { "id": 1418, "name": "libpthread-2.17.so@5440", "module": "libpthread-2.17.so" }, { "id": 1424, "name": "libpthread-2.17.so@5780", "module": "libpthread-2.17.so" }, { "id": 1426, "name": "libpthread-2.17.so@56d0", "module": "libpthread-2.17.so" }, { "id": 1430, "name": "frame_dummy", "module": "libpthread-2.17.so" }, { "id": 1455, "name": "a.out@4005d0", "module": "a.out" }, { "id": 1482, "name": "(__kmp_do_serial_initialize, void)", "module": "libomp.so" }, { "id": 1484, "name": "__kmp_register_library_startup()", "module": "libomp.so" }, { "id": 1488, "name": "ptmalloc_init.part.8", "module": "libc-2.17.so" }, { "id": 1489, "name": "_dl_addr", "module": "libc-2.17.so" }, { "id": 1535, "name": "sysconf", "module": "libc-2.17.so" }, { "id": 1569, "name": "__kmp_env_initialize(const char)", "module": "libomp.so" }, { "id": 1570, "name": "(__kmp_stg_init, void)", "module": "libomp.so" }, { "id": 1572, "name": "get_phys_pages", "module": "libc-2.17.so" }, { "id": 1574, "name": "_IO_new_fopen", "module": "libc-2.17.so" }, { "id": 1576, "name": "_IO_file_init@@GLIBC_2.2.5", "module": "libc-2.17.so" }, { "id": 1577, "name": "__GI__IO_link_in", "module": "libc-2.17.so" }, { "id": 1578, "name": "_pthread_cleanup_push_defer", "module": "libpthread-2.17.so" }, { "id": 1579, "name": "_pthread_cleanup_pop_restore", "module": "libpthread-2.17.so" }, { "id": 1646, "name": "__GI_sscanf", "module": "libc-2.17.so" }, { "id": 1647, "name": "vsscanf", "module": "libc-2.17.so" }, { "id": 1649, "name": "_IO_vfscanf", "module": "libc-2.17.so" }, { "id": 1653, "name": "fclose@@GLIBC_2.2.5", "module": "libc-2.17.so" }, { "id": 1654, "name": "__GI__IO_un_link", "module": "libc-2.17.so" }, { "id": 1757, "name": "(__kmp_launch_monitor, void)", "module": "libomp.so" }, { "id": 1758, "name": "(__kmp_itt_thr_ignore_init_3_0, void)", "module": "libomp.so" }, { "id": -1, "name": "<Unknown>", "module": "<Unknown>" }],
        links: [{ "source": 345, "target": 346, "value": 170 }, { "source": 346, "target": 350, "value": 110 }, { "source": 1570, "target": 782, "value": 134 }, { "source": 1569, "target": 1570, "value": 134 }, { "source": 782, "target": 1535, "value": 134 }, { "source": 1572, "target": 1653, "value": 44 }, { "source": 1535, "target": 1572, "value": 134 }, { "source": 1654, "target": 1579, "value": 16 }, { "source": 1653, "target": 1654, "value": 44 }, { "source": 1654, "target": 1578, "value": 28 }, { "source": 1649, "target": 1579, "value": 16 }, { "source": 1647, "target": 1649, "value": 44 }, { "source": 1646, "target": 1647, "value": 44 }, { "source": 1572, "target": 1646, "value": 44 }, { "source": 1649, "target": 1578, "value": 28 }, { "source": 1572, "target": 1574, "value": 46 }, { "source": 1577, "target": 1579, "value": 16 }, { "source": 1576, "target": 1577, "value": 46 }, { "source": 1574, "target": 1576, "value": 46 }, { "source": 1577, "target": 1578, "value": 30 }, { "source": 977, "target": 366, "value": 100 }, { "source": 1482, "target": 1484, "value": 100 }, { "source": 583, "target": 1482, "value": 100 }, { "source": 945, "target": 583, "value": 100 }, { "source": 927, "target": 945, "value": 100 }, { "source": 1455, "target": 927, "value": 100 }, { "source": 1484, "target": 977, "value": 100 }, { "source": 366, "target": 1488, "value": 100 }, { "source": 1489, "target": 479, "value": 48 }, { "source": 1488, "target": 1489, "value": 100 }, { "source": 1489, "target": 352, "value": 52 }, { "source": 1401, "target": 1430, "value": 32 }, { "source": 1403, "target": 1426, "value": 838 }, { "source": 1402, "target": 1403, "value": 1944 }, { "source": 1401, "target": 1402, "value": 1952 }, { "source": 1403, "target": 1424, "value": 58 }, { "source": 1403, "target": 1418, "value": 62 }, { "source": 1403, "target": 1415, "value": 358 }, { "source": 1403, "target": 1412, "value": 62 }, { "source": 1403, "target": 1405, "value": 266 }, { "source": 325, "target": 345, "value": 170 }, { "source": 255, "target": 325, "value": 1418 }, { "source": 477, "target": 481, "value": 40 }, { "source": 255, "target": 1757, "value": 500 }, { "source": 524, "target": 527, "value": 802 }, { "source": 502, "target": 524, "value": 688 }, { "source": 1757, "target": 502, "value": 478 }, { "source": 512, "target": 521, "value": 186 }, { "source": 508, "target": 512, "value": 346 }, { "source": 502, "target": 508, "value": 892 }, { "source": 508, "target": 510, "value": 546 }, { "source": 503, "target": 506, "value": 114 }, { "source": 502, "target": 503, "value": 32 }, { "source": 1758, "target": 481, "value": 22 }, { "source": 1757, "target": 1758, "value": 22 }, { "source": 255, "target": 321, "value": 298 }, { "source": 255, "target": 318, "value": 186 }, { "source": 255, "target": 615, "value": 186 }, { "source": 255, "target": 506, "value": 24 }, { "source": 255, "target": 606, "value": 324 }, { "source": 255, "target": 603, "value": 4062 }, { "source": 325, "target": 530, "value": 114 }, { "source": 530, "target": 541, "value": 114 }, { "source": 547, "target": 477, "value": 20 }, { "source": 541, "target": 547, "value": 114 }, { "source": 555, "target": 570, "value": 38 }, { "source": 547, "target": 555, "value": 94 }, { "source": 555, "target": 569, "value": 6 }, { "source": 555, "target": 568, "value": 12 }, { "source": 555, "target": 567, "value": 38 }, { "source": 325, "target": 502, "value": 1134 }, { "source": 346, "target": 481, "value": 60 }, { "source": 350, "target": 354, "value": 110 }, { "source": 950, "target": 951, "value": 754 }, { "source": 951, "target": 953, "value": 754 }, { "source": 953, "target": 1096, "value": 6 }, { "source": 1092, "target": 1095, "value": 18 }, { "source": 953, "target": 1092, "value": 224 }, { "source": 1092, "target": 1093, "value": 182 }, { "source": 953, "target": 960, "value": 424 }, { "source": 960, "target": 1034, "value": 100 }, { "source": 1034, "target": 1041, "value": 100 }, { "source": 1046, "target": 479, "value": 48 }, { "source": 1042, "target": 1046, "value": 100 }, { "source": 1041, "target": 1042, "value": 100 }, { "source": 1046, "target": 352, "value": 52 }, { "source": 1012, "target": 1017, "value": 188 }, { "source": 1028, "target": 1012, "value": 162 }, { "source": 960, "target": 1028, "value": 162 }, { "source": 1012, "target": 1016, "value": 20 }, { "source": 1012, "target": 569, "value": 48 }, { "source": 1012, "target": 568, "value": 44 }, { "source": 1012, "target": 1015, "value": 24 }, { "source": 960, "target": 970, "value": 162 }, { "source": 997, "target": 1012, "value": 162 }, { "source": 970, "target": 997, "value": 162 }, { "source": 953, "target": 479, "value": 48 }, { "source": 953, "target": 352, "value": 52 }, { "source": 910, "target": 524, "value": 48 }, { "source": 810, "target": 910, "value": 1290 }, { "source": 805, "target": 810, "value": 2020 }, { "source": 846, "target": 847, "value": 202 }, { "source": 824, "target": 846, "value": 458 }, { "source": 910, "target": 824, "value": 1218 }, { "source": 824, "target": 844, "value": 98 }, { "source": 824, "target": 836, "value": 1130 }, { "source": 824, "target": 827, "value": 106 }, { "source": 824, "target": 506, "value": 32 }, { "source": 910, "target": 503, "value": 24 }, { "source": 811, "target": 524, "value": 66 }, { "source": 810, "target": 811, "value": 730 }, { "source": 811, "target": 824, "value": 606 }, { "source": 811, "target": 503, "value": 58 }],
    },
    schedule: {
        functions: [{ "id": 0, "name": "__schedule", "module": "<.text.kernel>" }, { "id": 1, "name": "__context_tracking_task_switch", "module": "<.text.kernel>" }, { "id": 2, "name": "__switch_to", "module": "<.text.kernel>" }, { "id": 3, "name": "native_load_sp0", "module": "<.text.kernel>" }, { "id": 4, "name": "native_load_tls", "module": "<.text.kernel>" }, { "id": 5, "name": "native_write_msr_safe", "module": "<.text.kernel>" }, { "id": 8, "name": "finish_task_switch", "module": "<.text.kernel>" }, { "id": 9, "name": "vtime_common_task_switch", "module": "<.text.kernel>" }, { "id": 10, "name": "vtime_account_idle", "module": "<.text.kernel>" }, { "id": 11, "name": "get_vtime_delta", "module": "<.text.kernel>" }, { "id": 12, "name": "local_clock", "module": "<.text.kernel>" }, { "id": 13, "name": "sched_clock_cpu", "module": "<.text.kernel>" }, { "id": 14, "name": "sched_clock", "module": "<.text.kernel>" }, { "id": 15, "name": "native_sched_clock", "module": "<.text.kernel>" }, { "id": 16, "name": "native_read_tsc", "module": "<.text.kernel>" }, { "id": 17, "name": "arch_vtime_task_switch", "module": "<.text.kernel>" }, { "id": 18, "name": "_raw_spin_lock", "module": "<.text.kernel>" }, { "id": 19, "name": "_raw_spin_unlock", "module": "<.text.kernel>" }, { "id": 29, "name": "__vtime_account_system", "module": "<.text.kernel>" }, { "id": 30, "name": "account_system_time", "module": "<.text.kernel>" }, { "id": 31, "name": "cpuacct_account_field", "module": "<.text.kernel>" }, { "id": 32, "name": "acct_account_cputime", "module": "<.text.kernel>" }, { "id": 33, "name": "__acct_update_integrals", "module": "<.text.kernel>" }, { "id": 34, "name": "jiffies_to_timeval", "module": "<.text.kernel>" }, { "id": 36, "name": "rcu_eqs_enter", "module": "<.text.kernel>" }, { "id": 37, "name": "rcu_eqs_enter_common.isra.47", "module": "<.text.kernel>" }, { "id": 44, "name": "start_thread", "module": "libpthread-2.19.so" }, { "id": 47, "name": "system_call", "module": "<.text.kernel>" }, { "id": 52, "name": "rcu_eqs_exit", "module": "<.text.kernel>" }, { "id": 53, "name": "rcu_eqs_exit_common.isra.48", "module": "<.text.kernel>" }, { "id": 105, "name": "down_read", "module": "<.text.kernel>" }, { "id": 114, "name": "_raw_spin_lock_irqsave", "module": "<.text.kernel>" }, { "id": 120, "name": "_raw_spin_unlock_irqrestore", "module": "<.text.kernel>" }, { "id": 142, "name": "source_load", "module": "<.text.kernel>" }, { "id": 143, "name": "target_load", "module": "<.text.kernel>" }, { "id": 145, "name": "idle_cpu", "module": "<.text.kernel>" }, { "id": 149, "name": "update_rq_clock.part.63", "module": "<.text.kernel>" }, { "id": 152, "name": "update_curr", "module": "<.text.kernel>" }, { "id": 153, "name": "update_cfs_rq_blocked_load", "module": "<.text.kernel>" }, { "id": 154, "name": "account_entity_enqueue", "module": "<.text.kernel>" }, { "id": 155, "name": "update_cfs_shares", "module": "<.text.kernel>" }, { "id": 158, "name": "rb_insert_color", "module": "<.text.kernel>" }, { "id": 159, "name": "hrtick_update", "module": "<.text.kernel>" }, { "id": 169, "name": "tracing_record_cmdline", "module": "<.text.kernel>" }, { "id": 170, "name": "tracing_is_on", "module": "<.text.kernel>" }, { "id": 171, "name": "ring_buffer_record_is_on", "module": "<.text.kernel>" }, { "id": 173, "name": "reschedule_interrupt", "module": "<.text.kernel>" }, { "id": 174, "name": "smp_reschedule_interrupt", "module": "<.text.kernel>" }, { "id": 175, "name": "native_apic_mem_write", "module": "<.text.kernel>" }, { "id": 176, "name": "scheduler_ipi", "module": "<.text.kernel>" }, { "id": 181, "name": "rcu_note_context_switch", "module": "<.text.kernel>" }, { "id": 182, "name": "_raw_spin_lock_irq", "module": "<.text.kernel>" }, { "id": 183, "name": "put_prev_task_fair", "module": "<.text.kernel>" }, { "id": 184, "name": "update_min_vruntime", "module": "<.text.kernel>" }, { "id": 185, "name": "cpuacct_charge", "module": "<.text.kernel>" }, { "id": 186, "name": "pick_next_task_fair", "module": "<.text.kernel>" }, { "id": 187, "name": "clear_buddies", "module": "<.text.kernel>" }, { "id": 188, "name": "set_next_entity", "module": "<.text.kernel>" }, { "id": 189, "name": "update_stats_wait_end", "module": "<.text.kernel>" }, { "id": 190, "name": "rb_next", "module": "<.text.kernel>" }, { "id": 191, "name": "rb_erase", "module": "<.text.kernel>" }, { "id": 192, "name": "probe_sched_switch", "module": ".text.simple_pt" }, { "id": 193, "name": "poor_mans_ptwrite_prev_pid", "module": ".text.simple_pt" }, { "id": 195, "name": "poor_mans_ptwrite_pid", "module": ".text.simple_pt" }, { "id": 197, "name": "ftrace_raw_event_switch_out", "module": ".text.simple_pt" }, { "id": 198, "name": "trace_event_buffer_lock_reserve", "module": "<.text.kernel>" }, { "id": 199, "name": "trace_buffer_lock_reserve", "module": "<.text.kernel>" }, { "id": 200, "name": "ring_buffer_lock_reserve", "module": "<.text.kernel>" }, { "id": 201, "name": "rb_reserve_next_event", "module": "<.text.kernel>" }, { "id": 202, "name": "trace_clock_local", "module": "<.text.kernel>" }, { "id": 203, "name": "ring_buffer_event_data", "module": "<.text.kernel>" }, { "id": 204, "name": "rb_event_data", "module": "<.text.kernel>" }, { "id": 205, "name": "tracing_generic_entry_update", "module": "<.text.kernel>" }, { "id": 206, "name": "filter_check_discard", "module": "<.text.kernel>" }, { "id": 207, "name": "trace_buffer_unlock_commit", "module": "<.text.kernel>" }, { "id": 208, "name": "ring_buffer_unlock_commit", "module": "<.text.kernel>" }, { "id": 209, "name": "rb_update_write_stamp", "module": "<.text.kernel>" }, { "id": 210, "name": "ftrace_trace_userstack", "module": "<.text.kernel>" }, { "id": 211, "name": "probe_sched_switch", "module": "<.text.kernel>" }, { "id": 212, "name": "perf_event_task_sched_out", "module": "<.text.kernel>" }, { "id": 213, "name": "vtime_account_system", "module": "<.text.kernel>" }, { "id": 214, "name": "schedule", "module": "<.text.kernel>" }, { "id": 219, "name": "deactivate_task", "module": "<.text.kernel>" }, { "id": 220, "name": "dequeue_task", "module": "<.text.kernel>" }, { "id": 221, "name": "dequeue_task_fair", "module": "<.text.kernel>" }, { "id": 222, "name": "dequeue_entity", "module": "<.text.kernel>" }, { "id": 223, "name": "account_entity_dequeue", "module": "<.text.kernel>" }, { "id": 224, "name": "ftrace_raw_event_switch_in", "module": ".text.simple_pt" }, { "id": 225, "name": "SyS_exit", "module": "<.text.kernel>" }, { "id": 226, "name": "do_exit", "module": "<.text.kernel>" }, { "id": 258, "name": "call_rwsem_down_read_failed", "module": "<.text.kernel>" }, { "id": 259, "name": "rwsem_down_read_failed", "module": "<.text.kernel>" }, { "id": 260, "name": "__calc_delta", "module": "<.text.kernel>" }, { "id": 261, "name": "idle_balance", "module": "<.text.kernel>" }, { "id": 262, "name": "update_blocked_averages", "module": "<.text.kernel>" }, { "id": 263, "name": "update_rq_clock", "module": "<.text.kernel>" }, { "id": 264, "name": "load_balance", "module": "<.text.kernel>" }, { "id": 265, "name": "find_busiest_group", "module": "<.text.kernel>" }, { "id": 266, "name": "update_group_power", "module": "<.text.kernel>" }, { "id": 267, "name": "msecs_to_jiffies", "module": "<.text.kernel>" }, { "id": 268, "name": "sched_cfs_period_timer", "module": "<.text.kernel>" }, { "id": 269, "name": "cpumask_next_and", "module": "<.text.kernel>" }, { "id": 270, "name": "find_next_bit", "module": "<.text.kernel>" }, { "id": 271, "name": "pick_next_task_stop", "module": "<.text.kernel>" }, { "id": 272, "name": "pick_next_task_rt", "module": "<.text.kernel>" }, { "id": 273, "name": "pick_next_task_idle", "module": "<.text.kernel>" }, { "id": 274, "name": "post_schedule_idle", "module": "<.text.kernel>" }, { "id": 275, "name": "idle_enter_fair", "module": "<.text.kernel>" }, { "id": 276, "name": "schedule_preempt_disabled", "module": "<.text.kernel>" }, { "id": 278, "name": "tick_nohz_idle_enter", "module": "<.text.kernel>" }, { "id": 279, "name": "set_cpu_sd_state_idle", "module": "<.text.kernel>" }, { "id": 280, "name": "__tick_nohz_idle_enter", "module": "<.text.kernel>" }, { "id": 281, "name": "ktime_get", "module": "<.text.kernel>" }, { "id": 282, "name": "read_tsc", "module": "<.text.kernel>" }, { "id": 283, "name": "sched_clock_idle_sleep_event", "module": "<.text.kernel>" }, { "id": 284, "name": "tick_nohz_stop_sched_tick", "module": "<.text.kernel>" }, { "id": 285, "name": "timekeeping_max_deferment", "module": "<.text.kernel>" }, { "id": 286, "name": "rcu_needs_cpu", "module": "<.text.kernel>" }, { "id": 287, "name": "rcu_cpu_has_callbacks", "module": "<.text.kernel>" }, { "id": 288, "name": "irq_work_needs_cpu", "module": "<.text.kernel>" }, { "id": 289, "name": "get_next_timer_interrupt", "module": "<.text.kernel>" }, { "id": 290, "name": "hrtimer_get_next_event", "module": "<.text.kernel>" }, { "id": 291, "name": "nohz_balance_enter_idle", "module": "<.text.kernel>" }, { "id": 292, "name": "calc_load_enter_idle", "module": "<.text.kernel>" }, { "id": 293, "name": "hrtimer_start", "module": "<.text.kernel>" }, { "id": 294, "name": "__hrtimer_start_range_ns", "module": "<.text.kernel>" }, { "id": 295, "name": "lock_hrtimer_base.isra.19", "module": "<.text.kernel>" }, { "id": 296, "name": "__remove_hrtimer", "module": "<.text.kernel>" }, { "id": 297, "name": "timerqueue_del", "module": "<.text.kernel>" }, { "id": 298, "name": "hrtimer_force_reprogram", "module": "<.text.kernel>" }, { "id": 299, "name": "tick_program_event", "module": "<.text.kernel>" }, { "id": 300, "name": "clockevents_program_event", "module": "<.text.kernel>" }, { "id": 301, "name": "lapic_next_deadline", "module": "<.text.kernel>" }, { "id": 302, "name": "enqueue_hrtimer", "module": "<.text.kernel>" }, { "id": 303, "name": "timerqueue_add", "module": "<.text.kernel>" }, { "id": 304, "name": "arch_cpu_idle_enter", "module": "<.text.kernel>" }, { "id": 305, "name": "local_touch_nmi", "module": "<.text.kernel>" }, { "id": 306, "name": "atomic_notifier_call_chain", "module": "<.text.kernel>" }, { "id": 307, "name": "notifier_call_chain", "module": "<.text.kernel>" }, { "id": 308, "name": "tick_check_broadcast_expired", "module": "<.text.kernel>" }, { "id": 309, "name": "rcu_idle_enter", "module": "<.text.kernel>" }, { "id": 310, "name": "rcu_sysidle_enter", "module": "<.text.kernel>" }, { "id": 311, "name": "arch_cpu_idle", "module": "<.text.kernel>" }, { "id": 312, "name": "cpuidle_idle_call", "module": "<.text.kernel>" }, { "id": 313, "name": "cpuidle_get_cpu_driver", "module": "<.text.kernel>" }, { "id": 314, "name": "menu_select", "module": "<.text.kernel>" }, { "id": 315, "name": "pm_qos_request", "module": "<.text.kernel>" }, { "id": 316, "name": "tick_nohz_get_sleep_length", "module": "<.text.kernel>" }, { "id": 317, "name": "ns_to_timespec", "module": "<.text.kernel>" }, { "id": 318, "name": "nr_iowait_cpu", "module": "<.text.kernel>" }, { "id": 319, "name": "this_cpu_load", "module": "<.text.kernel>" }, { "id": 320, "name": "int_sqrt", "module": "<.text.kernel>" }, { "id": 321, "name": "menu_reflect", "module": "<.text.kernel>" }, { "id": 322, "name": "rcu_idle_exit", "module": "<.text.kernel>" }, { "id": 323, "name": "rcu_sysidle_exit", "module": "<.text.kernel>" }, { "id": 324, "name": "rcu_sysidle_force_exit", "module": "<.text.kernel>" }, { "id": 325, "name": "arch_cpu_idle_exit", "module": "<.text.kernel>" }, { "id": 326, "name": "tick_nohz_idle_exit", "module": "<.text.kernel>" }, { "id": 327, "name": "tick_nohz_stop_idle", "module": "<.text.kernel>" }, { "id": 328, "name": "update_ts_time_stats", "module": "<.text.kernel>" }, { "id": 329, "name": "sched_clock_idle_wakeup_event", "module": "<.text.kernel>" }, { "id": 330, "name": "sched_clock_tick", "module": "<.text.kernel>" }, { "id": 331, "name": "touch_softlockup_watchdog", "module": "<.text.kernel>" }, { "id": 332, "name": "tick_do_update_jiffies64", "module": "<.text.kernel>" }, { "id": 333, "name": "update_cpu_load_nohz", "module": "<.text.kernel>" }, { "id": 334, "name": "calc_load_exit_idle", "module": "<.text.kernel>" }, { "id": 335, "name": "tick_nohz_restart", "module": "<.text.kernel>" }, { "id": 336, "name": "hrtimer_cancel", "module": "<.text.kernel>" }, { "id": 337, "name": "hrtimer_try_to_cancel", "module": "<.text.kernel>" }, { "id": 338, "name": "hrtimer_forward", "module": "<.text.kernel>" }, { "id": 339, "name": "hrtimer_start_range_ns", "module": "<.text.kernel>" }, { "id": 340, "name": "pre_schedule_idle", "module": "<.text.kernel>" }, { "id": 341, "name": "idle_exit_fair", "module": "<.text.kernel>" }, { "id": 342, "name": "put_prev_task_idle", "module": "<.text.kernel>" }, { "id": -1, "name": "<Unknown>", "module": "<Unknown>" }],
        links: [{ "source": 36, "target": 37, "value": 88 }, { "source": 33, "target": 34, "value": 40 }, { "source": 32, "target": 33, "value": 118 }, { "source": 30, "target": 32, "value": 134 }, { "source": 29, "target": 30, "value": 244 }, { "source": 30, "target": 31, "value": 22 }, { "source": 15, "target": 16, "value": 234 }, { "source": 14, "target": 15, "value": 806 }, { "source": 13, "target": 14, "value": 814 }, { "source": 12, "target": 13, "value": 228 }, { "source": 11, "target": 12, "value": 308 }, { "source": 29, "target": 11, "value": 200 }, { "source": 52, "target": 53, "value": 60 }, { "source": 311, "target": 312, "value": 3472 }, { "source": 0, "target": 311, "value": 3492 }, { "source": 214, "target": 0, "value": 23990 }, { "source": 17, "target": 19, "value": 56 }, { "source": 9, "target": 17, "value": 492 }, { "source": 8, "target": 9, "value": 1324 }, { "source": 17, "target": 13, "value": 228 }, { "source": 17, "target": 18, "value": 88 }, { "source": 10, "target": 11, "value": 200 }, { "source": 9, "target": 10, "value": 228 }, { "source": 2, "target": 5, "value": 16 }, { "source": 2, "target": 4, "value": 52 }, { "source": 2, "target": 3, "value": 24 }, { "source": 282, "target": 16, "value": 108 }, { "source": 281, "target": 282, "value": 216 }, { "source": 314, "target": 320, "value": 1460 }, { "source": 312, "target": 314, "value": 3136 }, { "source": 314, "target": 318, "value": 36 }, { "source": 314, "target": 319, "value": 16 }, { "source": 314, "target": 317, "value": 50 }, { "source": 314, "target": 316, "value": 16 }, { "source": 314, "target": 315, "value": 18 }, { "source": 312, "target": 313, "value": 22 }, { "source": 309, "target": 310, "value": 48 }, { "source": 0, "target": 309, "value": 230 }, { "source": 309, "target": 36, "value": 136 }, { "source": 0, "target": 308, "value": 18 }, { "source": 306, "target": 307, "value": 24 }, { "source": 304, "target": 306, "value": 30 }, { "source": 0, "target": 304, "value": 64 }, { "source": 304, "target": 305, "value": 12 }, { "source": 294, "target": 120, "value": 68 }, { "source": 293, "target": 294, "value": 1448 }, { "source": 284, "target": 293, "value": 1466 }, { "source": 280, "target": 284, "value": 2154 }, { "source": 278, "target": 280, "value": 2502 }, { "source": 0, "target": 278, "value": 2564 }, { "source": 301, "target": 5, "value": 64 }, { "source": 300, "target": 301, "value": 304 }, { "source": 299, "target": 300, "value": 1056 }, { "source": 294, "target": 299, "value": 576 }, { "source": 301, "target": 16, "value": 72 }, { "source": 300, "target": 281, "value": 440 }, { "source": 303, "target": 158, "value": 40 }, { "source": 302, "target": 303, "value": 276 }, { "source": 294, "target": 302, "value": 380 }, { "source": 298, "target": 299, "value": 576 }, { "source": 296, "target": 298, "value": 792 }, { "source": 294, "target": 296, "value": 598 }, { "source": 297, "target": 191, "value": 80 }, { "source": 296, "target": 297, "value": 232 }, { "source": 297, "target": 190, "value": 64 }, { "source": 295, "target": 114, "value": 108 }, { "source": 294, "target": 295, "value": 160 }, { "source": 284, "target": 292, "value": 24 }, { "source": 284, "target": 291, "value": 36 }, { "source": 290, "target": 120, "value": 34 }, { "source": 289, "target": 290, "value": 132 }, { "source": 284, "target": 289, "value": 264 }, { "source": 290, "target": 114, "value": 36 }, { "source": 289, "target": 19, "value": 14 }, { "source": 289, "target": 18, "value": 22 }, { "source": 284, "target": 288, "value": 14 }, { "source": 286, "target": 287, "value": 66 }, { "source": 284, "target": 286, "value": 106 }, { "source": 284, "target": 285, "value": 24 }, { "source": 283, "target": 13, "value": 114 }, { "source": 280, "target": 283, "value": 126 }, { "source": 280, "target": 281, "value": 110 }, { "source": 278, "target": 279, "value": 24 }, { "source": 0, "target": 120, "value": 34 }, { "source": 274, "target": 275, "value": 80 }, { "source": 0, "target": 274, "value": 92 }, { "source": 0, "target": 114, "value": 36 }, { "source": 0, "target": 8, "value": 1516 }, { "source": 213, "target": 19, "value": 14 }, { "source": 9, "target": 213, "value": 548 }, { "source": 213, "target": 29, "value": 474 }, { "source": 213, "target": 18, "value": 22 }, { "source": 0, "target": 2, "value": 626 }, { "source": 0, "target": 1, "value": 36 }, { "source": 0, "target": 212, "value": 56 }, { "source": 170, "target": 171, "value": 64 }, { "source": 169, "target": 170, "value": 128 }, { "source": 211, "target": 169, "value": 338 }, { "source": 0, "target": 211, "value": 426 }, { "source": 207, "target": 210, "value": 12 }, { "source": 197, "target": 207, "value": 242 }, { "source": 192, "target": 197, "value": 998 }, { "source": 0, "target": 192, "value": 2422 }, { "source": 208, "target": 209, "value": 100 }, { "source": 207, "target": 208, "value": 388 }, { "source": 197, "target": 206, "value": 8 }, { "source": 203, "target": 204, "value": 144 }, { "source": 197, "target": 203, "value": 46 }, { "source": 199, "target": 205, "value": 152 }, { "source": 198, "target": 199, "value": 1092 }, { "source": 197, "target": 198, "value": 574 }, { "source": 199, "target": 203, "value": 92 }, { "source": 202, "target": 14, "value": 148 }, { "source": 201, "target": 202, "value": 168 }, { "source": 200, "target": 201, "value": 576 }, { "source": 199, "target": 200, "value": 724 }, { "source": 192, "target": 193, "value": 88 }, { "source": 0, "target": 273, "value": 16 }, { "source": 0, "target": 186, "value": 712 }, { "source": 0, "target": 272, "value": 46 }, { "source": 0, "target": 271, "value": 24 }, { "source": 0, "target": 183, "value": 126 }, { "source": 261, "target": 18, "value": 22 }, { "source": 0, "target": 261, "value": 5970 }, { "source": 261, "target": 267, "value": 44 }, { "source": 261, "target": 13, "value": 456 }, { "source": 261, "target": 264, "value": 4154 }, { "source": 269, "target": 270, "value": 960 }, { "source": 264, "target": 269, "value": 352 }, { "source": 265, "target": 142, "value": 66 }, { "source": 264, "target": 265, "value": 3250 }, { "source": 265, "target": 145, "value": 172 }, { "source": 265, "target": 143, "value": 66 }, { "source": 265, "target": 269, "value": 1208 }, { "source": 262, "target": 120, "value": 34 }, { "source": 261, "target": 262, "value": 1022 }, { "source": 262, "target": 153, "value": 218 }, { "source": 149, "target": 13, "value": 228 }, { "source": 263, "target": 149, "value": 142 }, { "source": 262, "target": 263, "value": 160 }, { "source": 262, "target": 114, "value": 36 }, { "source": 261, "target": 19, "value": 14 }, { "source": 221, "target": 159, "value": 8 }, { "source": 220, "target": 221, "value": 1544 }, { "source": 219, "target": 220, "value": 1752 }, { "source": 0, "target": 219, "value": 1776 }, { "source": 222, "target": 155, "value": 438 }, { "source": 221, "target": 222, "value": 1348 }, { "source": 222, "target": 184, "value": 76 }, { "source": 222, "target": 223, "value": 102 }, { "source": 222, "target": 187, "value": 48 }, { "source": 222, "target": 153, "value": 68 }, { "source": 152, "target": 185, "value": 32 }, { "source": 222, "target": 152, "value": 234 }, { "source": 152, "target": 184, "value": 72 }, { "source": 220, "target": 149, "value": 142 }, { "source": 0, "target": 182, "value": 52 }, { "source": 0, "target": 181, "value": 76 }, { "source": 152, "target": 260, "value": 92 }, { "source": 155, "target": 154, "value": 34 }, { "source": 155, "target": 223, "value": 34 }, { "source": 155, "target": 152, "value": 226 }, { "source": 276, "target": 0, "value": 3532 }, { "source": 0, "target": 276, "value": 3548 }, { "source": 224, "target": 207, "value": 242 }, { "source": 192, "target": 224, "value": 998 }, { "source": 224, "target": 206, "value": 8 }, { "source": 224, "target": 203, "value": 46 }, { "source": 224, "target": 198, "value": 574 }, { "source": 192, "target": 195, "value": 88 }, { "source": 188, "target": 191, "value": 84 }, { "source": 186, "target": 188, "value": 428 }, { "source": 188, "target": 190, "value": 56 }, { "source": 188, "target": 189, "value": 132 }, { "source": 186, "target": 187, "value": 48 }, { "source": 0, "target": 342, "value": 10 }, { "source": 340, "target": 341, "value": 76 }, { "source": 0, "target": 340, "value": 98 }, { "source": 339, "target": 294, "value": 822 }, { "source": 335, "target": 339, "value": 836 }, { "source": 326, "target": 335, "value": 1738 }, { "source": 0, "target": 326, "value": 2184 }, { "source": 335, "target": 338, "value": 20 }, { "source": 337, "target": 120, "value": 34 }, { "source": 336, "target": 337, "value": 796 }, { "source": 335, "target": 336, "value": 822 }, { "source": 337, "target": 296, "value": 598 }, { "source": 337, "target": 295, "value": 80 }, { "source": 326, "target": 331, "value": 12 }, { "source": 326, "target": 334, "value": 20 }, { "source": 326, "target": 333, "value": 28 }, { "source": 326, "target": 332, "value": 24 }, { "source": 329, "target": 331, "value": 12 }, { "source": 327, "target": 329, "value": 38 }, { "source": 326, "target": 327, "value": 148 }, { "source": 329, "target": 330, "value": 8 }, { "source": 328, "target": 318, "value": 18 }, { "source": 327, "target": 328, "value": 76 }, { "source": 326, "target": 281, "value": 110 }, { "source": 325, "target": 306, "value": 30 }, { "source": 0, "target": 325, "value": 56 }, { "source": 174, "target": 176, "value": 60 }, { "source": 173, "target": 174, "value": 94 }, { "source": 0, "target": 322, "value": 222 }, { "source": 174, "target": 175, "value": 12 }, { "source": 323, "target": 324, "value": 18 }, { "source": 322, "target": 323, "value": 66 }, { "source": 322, "target": 52, "value": 110 }, { "source": 312, "target": 321, "value": 22 }, { "source": 312, "target": 173, "value": 184 }, { "source": 266, "target": 268, "value": 30 }, { "source": 265, "target": 266, "value": 230 }, { "source": 266, "target": 267, "value": 22 }],
    },
};
// A Scale to generate colors for each function name.
var function_color = d3.scale.category20();


// # Create Butterly visualization

// Create `Butterfly` object
var cfg = new c3.Butterfly({
    anchor: '#cfg_butterfly',

    height: 600,

    // Link to control flow graph `functions` and `links` **data**
    data: cfg_datasets['libpthread'].functions,
    links: cfg_datasets['libpthread'].links,
    
    // Define unique **key** accessor for functions
    key: (func) => func.id,

    // **Align** CFG to start on the `left`
    align: 'left',

    // **Style** nodes based on the function name and create tooltips.
    // **Animate** transitions for all of the nodes and links.
    node_options: {
        title: (func) => func.name,
        styles: {
            fill: (func) => function_color(func.name),
            stroke: 'black',
        },
        animate: true,
        duration: 2000,
    },
    rect_options: {
        animate: true,
        duration: 2000,
    },
    link_options: {
        // A poor-performing method of constructing a tooltip with function names.
        // A look-up hash could be used.  The sankey object could be extended with this
        // functionality if requested for relatively little space cost.
        title: (link) => cfg.data.filter((f) => f.id == link.source)[0].name + " → " + cfg.data.filter((f) => f.id == link.target)[0].name,
        animate: true,
        duration: 2000,
    },
    path_options: {
        animate: true,
        duration: 2000,
    },
});
cfg.render();


// # Extend dynamic Chart behavior

// Resize the control flow graph when the window is resized.
window.onresize = function () { cfg.resize(); };


// Select example **data set**
document.getElementById('dataset').addEventListener('change', function () {
    cfg.data = cfg_datasets[this.value].functions;
    cfg.links = cfg_datasets[this.value].links;
    cfg.redraw();
});

// Set **Depth of Field**
document.getElementById('depth_of_field').addEventListener('change', function () {
    cfg.depth_of_field = +this.value;
    cfg.redraw();
});
