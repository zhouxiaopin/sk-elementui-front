<template>
<!--    <div class="SkBtn"></div>-->
    <el-button :type="type" :icon="icon?'el-icon-'+icon:''" @click="handleClick" :size="size"
               :disabled="!hasPerms(perms)">
<!--        {{label}}}-->
        <span v-if="$slots.default"><slot></slot></span>
    </el-button>
</template>

<script>
    import {hasPermission} from '@/utils/permis'
    export default {
        name: "SkBtn",
        props: {
            label: {  // 按钮显示文本
                type: String,
                default: 'Button'
            },
            type: {  // 按钮类型
                type: String,
                default: "primary"
            },
            icon: {  // 按钮显示图标
                type: String,
                default: ''
            },
            size: {  // 按钮尺寸
                type: String,
                default: 'mini'
            },
            // loading: {  // 按钮加载标识
            //     type: Boolean,
            //     default: false
            // },
            disabled: {  // 按钮是否禁用
                type: Boolean,
                default: false
            },
            perms: {  // 按钮权限标识，外部使用者传入
                type: String,
                required:false,
                default: ''
            }
        },
        methods: {
            handleClick: function (evt) {
                // 按钮操作处理函数
                this.$emit('click', evt);
            },
            hasPerms: function (perms) {
                // 根据权限标识和外部指示状态进行权限判断
                return hasPermission(perms) && !this.disabled
            }
        }
    }
</script>

<style lang="scss" scoped>
    .SkBtn {
    }
</style>