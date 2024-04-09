package com.example.bootshelf.adapter.output.es;

import com.example.bootshelf.adapter.output.es.entity.EsReview;
import com.example.bootshelf.application.port.output.GetListReviewPort;
import com.example.bootshelf.application.port.output.GetSortListReviewPort;
import com.example.bootshelf.application.port.output.GetTotalListReviewPort;
import com.example.bootshelf.common.ExternalSystemAdapter;
import lombok.RequiredArgsConstructor;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.MatchQueryBuilder;
import org.elasticsearch.index.query.MultiMatchQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.fetch.subphase.highlight.HighlightBuilder;
import org.elasticsearch.search.sort.SortBuilders;
import org.elasticsearch.search.sort.SortOrder;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.query.NativeSearchQuery;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@ExternalSystemAdapter
public class EsReviewAdapter implements GetListReviewPort, GetTotalListReviewPort, GetSortListReviewPort {

    private final ElasticsearchOperations operations;

    @Override
    public SearchHits<EsReview> titleSearchByMain(Integer selectedDropdownValue, String title, Pageable pageable) {

        if (selectedDropdownValue == 1) {
            MatchQueryBuilder matchQueryBuilder = QueryBuilders.matchQuery("reviewTitle", title);

            NativeSearchQuery build = new NativeSearchQueryBuilder()
                    .withQuery(matchQueryBuilder)
                    .withPageable(pageable)
                    .build();

            return operations.search(build, EsReview.class);

        } else {
            MultiMatchQueryBuilder multiMatchQueryBuilder = QueryBuilders.multiMatchQuery(title,
                    "reviewTitle", "reviewContent");

            NativeSearchQuery build = new NativeSearchQueryBuilder()
                    .withQuery(multiMatchQueryBuilder)
                    .withPageable(pageable)
                    .build();

            return operations.search(build, EsReview.class);
        }
    }

    @Override
    public SearchHits<EsReview> titleContentSearchResult(String sortField, String title, Pageable pageable) {
        MultiMatchQueryBuilder multiMatchQueryBuilder = QueryBuilders.multiMatchQuery(title,
                "reviewTitle", "reviewContent");

        HighlightBuilder highlightBuilder = new HighlightBuilder();
        highlightBuilder.field("reviewTitle"); // 하이라이팅을 적용할 필드 지정
        highlightBuilder.field("reviewContent"); // 하이라이팅을 적용할 필드 지정
        highlightBuilder.preTags("<em>"); // 하이라이트 시작 태그
        highlightBuilder.postTags("</em>"); // 하이라이트 종료 태그

        NativeSearchQuery build = new NativeSearchQueryBuilder()
                .withQuery(multiMatchQueryBuilder)
                .withHighlightBuilder(highlightBuilder) // 하이라이트 설정 추가
                .withPageable(pageable)
                .withSort(SortBuilders.fieldSort(sortField).order(SortOrder.DESC))
                .build();

        return operations.search(build, EsReview.class);
    }

    @Override
    public SearchHits<EsReview> titleContentSearch(Integer categoryIdx, String sortField, String title, Pageable pageable) {

        MultiMatchQueryBuilder multiMatchQueryBuilder = QueryBuilders.multiMatchQuery(title,
                "reviewTitle", "reviewContent");

        BoolQueryBuilder boolQueryBuilder = QueryBuilders.boolQuery()
                .filter(QueryBuilders.termQuery("reviewCategory", categoryIdx));

        HighlightBuilder highlightBuilder = new HighlightBuilder();
        highlightBuilder.field("reviewTitle"); // 하이라이팅을 적용할 필드 지정
        highlightBuilder.field("reviewContent"); // 하이라이팅을 적용할 필드 지정
        highlightBuilder.preTags("<em>"); // 하이라이트 시작 태그
        highlightBuilder.postTags("</em>"); // 하이라이트 종료 태그

        NativeSearchQuery build = new NativeSearchQueryBuilder()
                .withQuery(multiMatchQueryBuilder)
                .withFilter(boolQueryBuilder)
                .withHighlightBuilder(highlightBuilder) // 하이라이트 설정 추가
                .withPageable(pageable)
                .withSort(SortBuilders.fieldSort(sortField).order(SortOrder.ASC))
                .build();

        return operations.search(build, EsReview.class);
    }
}
