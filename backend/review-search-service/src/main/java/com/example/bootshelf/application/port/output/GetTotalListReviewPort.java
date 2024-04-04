package com.example.bootshelf.application.port.output;

import com.example.bootshelf.adapter.output.es.entity.EsReview;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.core.SearchHits;

public interface GetTotalListReviewPort {

    SearchHits<EsReview> titleSearchByMain(Integer selectedDropdownValue, String title, Pageable pageable);
}
