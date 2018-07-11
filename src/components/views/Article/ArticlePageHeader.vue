<template>
  <div class="article-page-header" v-if="article !== undefined">
    <div class="status">
      <div class="tags">
        <i-tag color="blue" v-for="tag in article.tags" :key="tag.id" class="dot-tag">{{tag[resolveI18N('name')]}}</i-tag>
      </div>
      <div class="switches" v-if="languages && languages.length > 1">
        <i-button-group size="small">
          <i-button type="ghost" :disabled="isLanguageActive(language)" @click.native="selectedLanguage(language)" v-for="language in languages" :key="language">
            {{ $i18n.messages[language.toUpperCase()].title }}
          </i-button>
        </i-button-group>
      </div>
    </div>
    <p class="title">{{article[resolveI18N('title')]}}</p>
    <i-row>
      <i-col :xs="24" :sm="10" :md="10" :lg="10" style="padding-left: 0;padding-right: 0;">
        <p class="info">
          <span class="author">{{ $t("article.author") }} / <a href="">{{article.author}}</a></span>
          <span class="publish-time">  {{ $t("article.publishTime") }} / <a href="">{{ article.add_time | socialDate }}</a></span>
        </p>
      </i-col>
      <i-col :xs="24" :sm="14" :md="14" :lg="14" style="padding-left: 0;padding-right: 0;">
        <p class="operate_info">
          <span class="readings"><a><i-icon type="eye"></i-icon> {{article.click_num}} {{ $t("article.read") }}</a></span>
          <span class="comments"><a @click="scrollToComments"><i-icon type="compose"></i-icon> {{article.comment_num}} {{ $t("article.comments") }}</a></span>
          <span class="likes"><a @click="likePost(article)"><i-icon type="heart"></i-icon> {{article.like_num}} {{ $t("article.likes") }}</a></span>
        </p>
      </i-col>
    </i-row>
    <p class="abstract" v-if="article.desc || article.en_desc">
      {{ $t("article.desc") }}：{{ article[resolveI18N('desc')] }}
    </p>
  </div>
</template>

<script type="text/ecmascript-6">
  import API from 'API';
  // mixin
  import {mixin, saveToLocal} from '@/common/js/utils';

  export default {
    name: 'article-page-header',
    props: {
      article: {
        Type: Object,
        default: undefined
      },
      languages: {
        Type: []
      }
    },
    mixins: [mixin],
    methods: {
      isLanguageActive: function (language) {
        return this.$i18n.locale === language;
      },
      likePost(post) {
        API.addPostLike({
          post_id: post.id
        }).then((response) => {
          post.like_num += 1;
          this.$Message.success('点赞成功');
        }).catch((error) => {
          console.log(error);
        });
      },
      selectedLanguage(language) {
        this.$i18n.locale = language;
        // 持久化
        saveToLocal('siteConfig', 'language', language);
      }
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/theme.styl";

	.article-page-header
		padding-bottom 10px
		text-align left
		.status
			display flex
			margin-bottom 10px
			line-height 100%
			.switches
				flex 1
				display flex
				justify-content flex-end
				cursor pointer
				.ivu-btn-ghost
					i::before, span
						color $default-desc-color
					&:hover
						i::before, span
							color $default-desc-hover-color
				.ivu-btn-ghost[disabled]
					i::before, span
						color $default-info-color
					&:hover
						i::before, span
							color $default-info-color
		.title
			font-weight 500
			color $default-title-color
			@media only screen and (max-width: $responsive-sm)
				font-size 24px
				line-height 27px
			@media screen and (min-width: $responsive-sm)
				font-size 25px
				line-height 35px
			@media screen and (min-width: $responsive-md)
				font-size 26px
				line-height 35px
			@media screen and (min-width: $responsive-lg)
				font-size 27px
				line-height 35px
		.info, .operate_info
			margin-top 10px
			font-size 14px
			font-weight 200
			line-height 18px
			color $default-desc-color
			@media only screen and (max-width: 768px)
				margin-top 7px
				font-size 12px
				line-height 15px
			a
				color: $default-link-color
				cursor pointer
				&:hover
					color $default-link-hover-color
			.publish-time
				margin-left 20px
		.operate_info
			text-align right
			@media only screen and (max-width: 768px)
				text-align left
			span
				+ span
					margin-left 10px
				a
					cursor pointer
					&:hover
						color $default-link-hover-color
		.abstract
			color $default-desc-color
			border 1px dashed $default-border-color
			background $default-border-color
			@media only screen and (max-width: $responsive-sm)
				padding 8px
				margin-top 8px
				font-size 13px
				line-height 18px
			@media screen and (min-width: $responsive-sm)
				padding 15px
				margin-top 8px
				font-size 14px
				line-height 24px
			@media screen and (min-width: $responsive-md)
				padding 20px
				margin-top 15px
				line-height 28px
			@media screen and (min-width: $responsive-lg)
				padding 20px
				margin-top 15px
				line-height 28px

</style>
